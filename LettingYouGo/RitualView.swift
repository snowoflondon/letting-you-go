import SwiftUI
import UIKit

private enum Palette {
    static let paper = Color(red: 0.97, green: 0.95, blue: 0.91)
    static let ink = Color(red: 0.22, green: 0.22, blue: 0.20)
    static let sky = Color(red: 0.86, green: 0.91, blue: 0.91)
    static let land = Color(red: 0.71, green: 0.76, blue: 0.68)
    static func balloon(_ colour: BalloonColour) -> Color {
        switch colour {
        case .red: Color(red: 0.74, green: 0.44, blue: 0.41)
        case .blue: Color(red: 0.44, green: 0.59, blue: 0.68)
        case .green: Color(red: 0.51, green: 0.61, blue: 0.48)
        }
    }
}

struct RitualView: View {
    @Environment(\.scenePhase) private var scenePhase
    @State private var ritual = Ritual()
    @State private var lastTick: ContinuousClock.Instant?
    @FocusState private var isWriting: Bool
    @ScaledMetric(relativeTo: .headline) private var holdHeight = 64.0

    private var travelling: Bool {
        [.journey, .dissolving, .complete].contains(ritual.stage)
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                HStack {
                    Text("letting-you-go").font(.headline)
                    Spacer()
                    Text("WIREFRAME · \(ritual.stage.rawValue)")
                        .font(.caption2.monospaced()).foregroundStyle(.secondary)
                        .accessibilityLabel("Prototype state: \(ritual.stage.rawValue)")
                }
                Text(title).font(.largeTitle.weight(.medium))
                    .multilineTextAlignment(.center).accessibilityAddTraits(.isHeader)

                SkyScene(ritual: ritual)
                    .frame(height: 300)
                    .clipShape(RoundedRectangle(cornerRadius: 24))
                    .accessibilityElement(children: .ignore)
                    .accessibilityLabel(sceneDescription)

                controls
            }
            .padding(24)
            .frame(maxWidth: 600)
            .frame(maxWidth: .infinity)
        }
        .background(Palette.paper.ignoresSafeArea())
        .foregroundStyle(Palette.ink)
        .tint(Palette.ink)
        .scrollDismissesKeyboard(.interactively)
        .task {
            while !Task.isCancelled {
                do { try await Task.sleep(for: .milliseconds(50)) }
                catch { break }
                tick()
            }
        }
        .onChange(of: scenePhase) { _, phase in
            lastTick = nil
            if phase != .active { ritual.cancelHold(); isWriting = false }
        }
        // Conceal text from the app switcher while a scene is inactive.
        .overlay {
            if scenePhase != .active {
                Palette.paper.ignoresSafeArea()
                    .overlay(Text("letting-you-go").font(.title2))
            }
        }
    }

    private var title: String {
        switch ritual.stage {
        case .write: "What will you let go?"
        case .ready: "A moment for yourself"
        case .holding: "When you’re ready, let go."
        case .journey: "A little farther away"
        case .dissolving, .complete: "Room to breathe"
        }
    }

    private var sceneDescription: String {
        if travelling, ritual.showsDestination, let location = ritual.location {
            return "\(location.landmark), \(location.city). \(ritual.stage == .complete ? "The balloon has faded." : "A balloon floats in the sky.")"
        }
        return "A \(ritual.colour.rawValue) balloon above a quiet landscape."
    }

    @ViewBuilder private var controls: some View {
        switch ritual.stage {
        case .write:
            VStack(alignment: .leading, spacing: 8) {
                Text("One worry, in your own words.").font(.subheadline)
                TextEditor(text: Binding(get: { ritual.worry }, set: { ritual.write($0) }))
                    .focused($isWriting)
                    .frame(minHeight: 110)
                    .padding(8)
                    .scrollContentBackground(.hidden)
                    .background(.white.opacity(0.7), in: RoundedRectangle(cornerRadius: 14))
                    .accessibilityLabel("Your worry")
                Text("\(ritual.worry.count)/200").font(.caption.monospacedDigit())
                    .frame(maxWidth: .infinity, alignment: .trailing)
                Picker("Balloon colour", selection: $ritual.colour) {
                    ForEach(BalloonColour.allCases, id: \.self) { colour in
                        Text(colour.rawValue.capitalized).tag(colour)
                    }
                }.pickerStyle(.segmented)
                Text("Choose a balloon colour").font(.caption).foregroundStyle(.secondary)
            }
            action("Continue") { isWriting = false; ritual.prepare() }
                .disabled(!ritual.canContinue)
            Text("Your words stay in memory only, on this device.")
                .font(.footnote).foregroundStyle(.secondary)
                .multilineTextAlignment(.center)

        case .ready, .holding:
            Text(ritual.stage == .holding ? "There’s no hurry." : "Hold the button, then lift your finger when you’re ready.")
                .multilineTextAlignment(.center)
            HoldButton(isHolding: ritual.stage == .holding,
                       onPress: { ritual.hold() },
                       onRelease: { ritual.release(); lastTick = nil },
                       onCancel: { ritual.cancelHold() },
                       onAccessibleRelease: {
                           ritual.hold(); ritual.release(); lastTick = nil
                       })
                .frame(height: holdHeight)
            Button("Edit your worry") { ritual.cancelHold(); ritual.edit() }
                .frame(minHeight: 44)

        case .journey, .dissolving, .complete:
            Text(ritual.message)
                .font(.title3).multilineTextAlignment(.center)
                .frame(maxWidth: .infinity, minHeight: 100, alignment: .top)
                .accessibilityIdentifier("journeyMessage")
            if ritual.stage == .complete {
                action("Release another worry") { ritual.reset(); lastTick = nil }
            } else {
                // Prototype-only instrumentation; no countdown or completion reward.
                Text("Active journey time: \(Int(min(ritual.elapsed, 30)))s · wireframe")
                    .font(.caption.monospacedDigit()).foregroundStyle(.secondary)
                Button("End this ritual") { ritual.reset(); lastTick = nil }
                    .frame(minHeight: 44)
            }
        }
    }

    private func action(_ label: String, perform: @escaping () -> Void) -> some View {
        Button(label, action: perform)
            .font(.headline).frame(maxWidth: .infinity, minHeight: 52)
            .buttonStyle(.borderedProminent).controlSize(.large)
    }

    private func tick() {
        guard scenePhase == .active,
              ritual.stage == .journey || ritual.stage == .dissolving else {
            lastTick = nil
            return
        }
        let now = ContinuousClock.now
        if let lastTick {
            let duration = lastTick.duration(to: now).components
            ritual.advance(by: Double(duration.seconds) + Double(duration.attoseconds) / 1e18)
        }
        lastTick = now
    }
}

private struct SkyScene: View {
    let ritual: Ritual
    private var travelling: Bool { [.journey, .dissolving, .complete].contains(ritual.stage) }

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                Palette.sky
                Capsule().fill(.white.opacity(0.65)).frame(width: 85, height: 20)
                    .position(x: geometry.size.width * 0.2, y: 45)
                Capsule().fill(.white.opacity(0.55)).frame(width: 65, height: 17)
                    .position(x: geometry.size.width * 0.8, y: 80)

                landscape
                    .frame(height: 100)
                    .frame(maxHeight: .infinity, alignment: .bottom)
                    .animation(.easeInOut(duration: 1), value: ritual.showsDestination)
                    .animation(.easeInOut(duration: 1), value: ritual.location?.landmark)

                VStack(spacing: 0) {
                    ZStack {
                        Ellipse().fill(Palette.balloon(ritual.colour))
                        if ritual.stage == .write {
                            Text(ritual.worry)
                                .font(.caption).foregroundStyle(.black)
                                .multilineTextAlignment(.center)
                                .padding(20)
                        }
                    }.frame(width: 160, height: 175)
                    Rectangle().fill(Palette.ink.opacity(0.6)).frame(width: 1, height: 45)
                }
                .opacity(max(0, 1 - max(0, ritual.elapsed - 30) / 1.5))
                .position(x: geometry.size.width / 2, y: 125)
            }
        }
    }

    @ViewBuilder private var landscape: some View {
        if travelling, ritual.showsDestination, let location = ritual.location {
            VStack(spacing: 0) {
                LandmarkPlaceholder(symbol: location.symbol)
                    .frame(height: 65)
                Text("\(location.landmark) · \(location.city)")
                    .font(.caption2).multilineTextAlignment(.center)
                    .padding(.horizontal, 8)
                    .frame(maxWidth: .infinity, minHeight: 35)
                    .background(Palette.land)
            }
            .transition(.opacity)
        } else {
            // Flat, generic city skyline: deliberately simple Phase 1 artwork.
            VStack(spacing: 0) {
                HStack(alignment: .bottom, spacing: 8) {
                    ForEach(0..<9) { index in
                        Rectangle().fill(Palette.land)
                            .frame(height: CGFloat([24, 42, 30, 52, 36, 25, 45, 30, 38][index]))
                    }
                }.frame(height: 55, alignment: .bottom)
                Rectangle().fill(Palette.land).frame(height: 45)
            }.transition(.opacity)
        }
    }
}

/// Diagrammatic place markers, intentionally not final landmark illustrations.
private struct LandmarkPlaceholder: View {
    let symbol: String
    var body: some View {
        HStack(alignment: .bottom, spacing: 6) {
            switch symbol {
            case "tower":
                Triangle().stroke(Palette.ink.opacity(0.65), lineWidth: 3).frame(width: 45)
            case "bridge":
                Rectangle().frame(width: 8, height: 60)
                Rectangle().frame(width: 80, height: 7).padding(.bottom, 20)
                Rectangle().frame(width: 8, height: 60)
            case "sails":
                ForEach(0..<3) { index in
                    Triangle().fill(.white.opacity(0.85)).frame(width: 35, height: CGFloat(40 + index * 9))
                }
            case "arches":
                ForEach(0..<5) { _ in
                    RoundedRectangle(cornerRadius: 8).stroke(lineWidth: 4).frame(width: 17, height: 40)
                }
            case "wall":
                ForEach(0..<5) { index in
                    Rectangle().frame(width: 25, height: index.isMultiple(of: 2) ? 35 : 20)
                }
            default:
                Image(systemName: "figure.stand").resizable().scaledToFit().frame(height: 60)
            }
        }.foregroundStyle(Palette.ink.opacity(0.6))
    }
}

private struct Triangle: Shape {
    func path(in rect: CGRect) -> Path {
        Path { path in
            path.move(to: CGPoint(x: rect.midX, y: rect.minY))
            path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
            path.addLine(to: CGPoint(x: rect.minX, y: rect.maxY))
            path.closeSubpath()
        }
    }
}

/// UIKit tracking distinguishes a real touch-up from system cancellation.
private struct HoldButton: UIViewRepresentable {
    let isHolding: Bool
    let onPress: () -> Void
    let onRelease: () -> Void
    let onCancel: () -> Void
    let onAccessibleRelease: () -> Void

    func makeUIView(context: Context) -> HoldControl { HoldControl() }
    func updateUIView(_ control: HoldControl, context: Context) {
        control.onPress = onPress
        control.onRelease = onRelease
        control.onCancel = onCancel
        control.onAccessibleRelease = onAccessibleRelease
        control.backgroundColor = UIColor(Palette.ink).withAlphaComponent(isHolding ? 0.75 : 1)
    }
}

private final class HoldControl: UIControl {
    var onPress: (() -> Void)?
    var onRelease: (() -> Void)?
    var onCancel: (() -> Void)?
    var onAccessibleRelease: (() -> Void)?
    private let label = UILabel()

    override init(frame: CGRect) {
        super.init(frame: frame)
        layer.cornerRadius = 16
        label.text = "Hold your balloon"
        label.textColor = .white
        label.font = .preferredFont(forTextStyle: .headline)
        label.adjustsFontForContentSizeCategory = true
        label.textAlignment = .center
        label.numberOfLines = 0
        label.isAccessibilityElement = false
        label.translatesAutoresizingMaskIntoConstraints = false
        addSubview(label)
        NSLayoutConstraint.activate([
            label.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            label.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            label.topAnchor.constraint(equalTo: topAnchor, constant: 8),
            label.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -8)
        ])
        isAccessibilityElement = true
        accessibilityLabel = "Hold your balloon"
        accessibilityHint = "Double-tap to release your balloon when you’re ready."
        accessibilityTraits = .button
        isMultipleTouchEnabled = false
    }

    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    override func beginTracking(_ touch: UITouch, with event: UIEvent?) -> Bool {
        onPress?()
        return true
    }

    override func endTracking(_ touch: UITouch?, with event: UIEvent?) {
        if let touch, bounds.contains(touch.location(in: self)) {
            onRelease?()
        } else { onCancel?() }
    }

    override func cancelTracking(with event: UIEvent?) { onCancel?() }

    override func accessibilityActivate() -> Bool {
        onAccessibleRelease?()
        return true
    }
}

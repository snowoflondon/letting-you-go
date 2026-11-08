import Foundation

enum RitualStage: String {
    case write, ready, holding, journey, dissolving, complete
}

enum BalloonColour: String, CaseIterable {
    case red, blue, green
}

struct Location: Equatable {
    let landmark: String
    let city: String
    let symbol: String
}

struct Journey {
    let locations: [Location]
    let passing: [String]
    let closing: String

    static func random() -> Journey {
        Journey(locations: Array(Content.locations.shuffled().prefix(3)),
                passing: Array(Content.passing.shuffled().prefix(2)),
                closing: Content.closing.randomElement()!)
    }

    static func render(_ template: String, at location: Location) -> String {
        template.replacingOccurrences(of: "{landmark}", with: location.landmark)
            .replacingOccurrences(of: "{city}", with: location.city)
    }
}

enum Content {
    static let locations = [
        Location(landmark: "Eiffel Tower", city: "Paris", symbol: "tower"),
        Location(landmark: "Tower Bridge", city: "London", symbol: "bridge"),
        Location(landmark: "Statue of Liberty", city: "New York City", symbol: "statue"),
        Location(landmark: "Tokyo Tower", city: "Tokyo", symbol: "tower"),
        Location(landmark: "Sydney Opera House", city: "Sydney", symbol: "sails"),
        Location(landmark: "Colosseum", city: "Rome", symbol: "arches"),
        Location(landmark: "The Great Wall", city: "Beijing", symbol: "wall"),
        Location(landmark: "Golden Gate Bridge", city: "San Francisco", symbol: "bridge")
    ]
    static let passing = [
        "Your balloon floats past {landmark} in {city}. Your worry has traveled so far away.",
        "Above {city}, your balloon keeps moving. In this moment, the world feels so small.",
        "Your balloon passes {landmark}. Where will life take you?"
    ]
    static let closing = [
        "Your balloon has traveled far, far away. The sky stretches as far as eyes can see.",
        "Your balloon comes to rest near {landmark} in {city}, then fades into the sky. The brisk air fills the space it left behind."
    ]
}

/// Pure, memory-only state machine. Elapsed time is supplied by the foreground clock.
struct Ritual {
    private(set) var stage: RitualStage = .write
    private(set) var worry = ""
    private(set) var journey: Journey?
    private(set) var elapsed: TimeInterval = 0
    var colour: BalloonColour = .red

    var canContinue: Bool { !worry.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }

    mutating func write(_ value: String) {
        guard stage == .write else { return }
        worry = String(value.prefix(200))
    }

    mutating func prepare() {
        guard stage == .write, canContinue else { return }
        stage = .ready
    }

    mutating func edit() {
        guard stage == .ready else { return }
        stage = .write
    }

    mutating func hold() {
        guard stage == .ready else { return }
        stage = .holding
    }

    mutating func cancelHold() {
        guard stage == .holding else { return }
        stage = .ready
    }

    mutating func release() {
        guard stage == .holding else { return }
        journey = .random()
        elapsed = 0
        stage = .journey
    }

    mutating func advance(by seconds: TimeInterval) {
        guard stage == .journey || stage == .dissolving else { return }
        elapsed += max(0, seconds)
        if elapsed >= 31.5 {
            worry = ""
            stage = .complete
        } else if elapsed >= 30 {
            stage = .dissolving
        }
    }

    mutating func reset() { self = Ritual() }

    var location: Location? {
        guard let journey, elapsed >= 10 else { return nil }
        return journey.locations[elapsed >= 30 ? 2 : (elapsed >= 20 ? 1 : 0)]
    }

    /// Transit returns between reveals; messages remain in place while scenery changes.
    var showsDestination: Bool {
        elapsed >= 30 || (elapsed >= 10 && elapsed < 14) || (elapsed >= 20 && elapsed < 24)
    }

    var message: String {
        guard let journey, let location else { return "Your balloon begins its journey." }
        let template = elapsed >= 30 ? journey.closing : journey.passing[elapsed >= 20 ? 1 : 0]
        return Journey.render(template, at: location)
    }
}

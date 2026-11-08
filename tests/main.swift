import Foundation

var failures = 0
func check(_ condition: @autoclosure () -> Bool, _ message: String) {
    if !condition() { failures += 1; print("FAIL: \(message)") }
}

var ritual = Ritual()
ritual.write(" \n ")
ritual.prepare()
check(ritual.stage == .write, "Whitespace cannot continue")
let family = "👨‍👩‍👧‍👦"
ritual.write(String(repeating: family, count: 201))
check(ritual.worry.count == 200, "Limit counts grapheme clusters, including pasted emoji")
check(ritual.worry == String(repeating: family, count: 200), "No split emoji")
ritual.prepare()
check(ritual.stage == .ready, "Continue enters ready")
ritual.release()
check(ritual.stage == .ready, "Release requires a hold")
ritual.hold()
check(ritual.stage == .holding, "Press enters holding")
ritual.cancelHold()
ritual.release()
check(ritual.stage == .ready && ritual.journey == nil, "Cancellation cannot release")
ritual.edit()
check(ritual.worry.count == 200 && ritual.stage == .write, "Editing preserves worry")
ritual.write("A sample worry")
ritual.prepare()
ritual.hold()
ritual.release()
check(ritual.stage == .journey, "No minimum hold duration")
let selected = ritual.journey!.locations
ritual.hold()
ritual.release()
check(ritual.journey!.locations == selected, "Duplicate release cannot replace journey")
check(ritual.location == nil, "Starts in transit")
ritual.advance(by: 9.99)
check(ritual.location == nil, "No early reveal")
ritual.advance(by: 0.02)
check(ritual.location == selected[0] && ritual.showsDestination, "First reveal at 10s")
let firstMessage = ritual.message
ritual.advance(by: 4)
check(!ritual.showsDestination && ritual.message == firstMessage, "Transit preserves passing message")
ritual.advance(by: 6)
check(ritual.location == selected[1] && ritual.showsDestination, "Second reveal at 20s")
ritual.advance(by: 10)
check(ritual.location == selected[2] && ritual.stage == .dissolving, "Final reveal at 30s")
check(!ritual.worry.isEmpty, "Worry retained until dissolution finishes")
let finalMessage = ritual.message
ritual.advance(by: 1.5)
check(ritual.stage == .complete && ritual.worry.isEmpty, "Dissolution clears worry")
ritual.advance(by: 100)
check(ritual.message == finalMessage && ritual.stage == .complete, "Closing persists")
ritual.reset()
check(ritual.stage == .write && ritual.worry.isEmpty && ritual.journey == nil, "Restart clears session")
ritual.write("Abandon this")
ritual.prepare()
ritual.hold()
ritual.release()
ritual.reset()
check(ritual.worry.isEmpty && ritual.elapsed == 0, "Abandon clears active ritual")

for _ in 0..<1000 {
    let journey = Journey.random()
    check(Set(journey.locations.map(\.landmark)).count == 3, "Three distinct locations")
    check(Set(journey.passing).count == 2, "Two distinct passing messages")
    check(Content.closing.contains(journey.closing), "Approved closing template")
    for location in Content.locations {
        for template in Content.passing + Content.closing {
            let rendered = Journey.render(template, at: location)
            check(!rendered.contains("{"), "All placeholders substituted")
        }
    }
}

if failures > 0 { fatalError("\(failures) checks failed") }
print("All ritual logic checks passed (including 1,000 randomized journeys).")

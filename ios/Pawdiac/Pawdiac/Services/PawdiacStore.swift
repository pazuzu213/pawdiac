import Foundation

@MainActor
final class PawdiacStore: ObservableObject {
    @Published var dog: DogProfile
    @Published var reading: DailyReading
    @Published var observations: [ObservationLog] = []

    init() {
        let birthday = Calendar.current.date(from: DateComponents(year: 2025, month: 2, day: 24)) ?? Date()
        let dog = DogProfile(name: "Phoebe", birthday: birthday, breed: "French Bulldog", energyLevel: 0.42, attachmentStyle: 0.82, foodMotivation: 0.74, sociability: 0.64, sensitivity: 0.88)
        self.dog = dog
        self.reading = ReadingEngine.preview(for: dog)
    }

    func logObservation(accuracy: AccuracyRating, energy: String, mood: String, notes: String) {
        observations.insert(ObservationLog(date: Date(), accuracy: accuracy, energy: energy, mood: mood, notes: notes), at: 0)
    }
}

enum ReadingEngine {
    static func preview(for dog: DogProfile) -> DailyReading {
        let sign = dog.sign
        let attachment = dog.attachmentStyle > 0.65 ? "strong attachment field" : "independent baseline"
        let sensitivity = dog.sensitivity > 0.65 ? "heightened sensitivity" : "steady emotional filter"
        return DailyReading(
            title: "\(dog.name)'s \(sign.rawValue) energy is unusually perceptive today.",
            todaysEnergy: "\(sign.rawValue) dogs carry \(sign.nature.lowercased()) Today, the moon's softer pull layers onto \(dog.name)'s \(attachment), making the room's emotional tone more important than usual.",
            whatToWatch: "Watch for \(sensitivity), shifts in appetite, and a stronger response to small changes in your voice or routine. This should show up in observable behavior, not vague mood language.",
            connectionMoment: "Give \(dog.name) one slow, quiet moment of connection before asking for activity. Let the nervous system settle first; then follow the energy that returns.",
            snapshot: "Sun sign: \(sign.rawValue). Life path: \(dog.lifePathNumber). Traits saved for future calculation: energy, attachment, food motivation, sociability, sensitivity."
        )
    }
}

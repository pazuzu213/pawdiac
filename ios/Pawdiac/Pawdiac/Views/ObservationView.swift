import SwiftUI

struct ObservationView: View {
    @EnvironmentObject private var store: PawdiacStore
    @State private var accuracy: AccuracyRating = .spotOn
    @State private var energy = "Normal"
    @State private var mood = "Calm"
    @State private var notes = ""

    var body: some View {
        NavigationStack {
            ZStack {
                CosmicBackground()
                ScrollView {
                    VStack(alignment: .leading, spacing: 18) {
                        Text("How did \(store.dog.name)'s day go?").font(.system(size: 34, weight: .medium, design: .serif)).foregroundStyle(.white)
                        Card { Picker("Accuracy", selection: $accuracy) { ForEach(AccuracyRating.allCases) { Text($0.rawValue).tag($0) } }.pickerStyle(.segmented) }
                        Card { Picker("Energy", selection: $energy) { ForEach(["High", "Normal", "Low"], id: \.self) { Text($0).tag($0) } }.pickerStyle(.segmented) }
                        Card { Picker("Mood", selection: $mood) { ForEach(["Playful", "Calm", "Anxious", "Withdrawn"], id: \.self) { Text($0).tag($0) } }.pickerStyle(.segmented) }
                        Card { TextField("What actually happened today?", text: $notes, axis: .vertical).lineLimit(3...6) }
                        Button("Save observation") {
                            store.logObservation(accuracy: accuracy, energy: energy, mood: mood, notes: notes)
                            notes = ""
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(Theme.gold)
                        .foregroundStyle(.black)
                    }
                    .padding(20)
                }
            }
            .navigationTitle("Observe")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

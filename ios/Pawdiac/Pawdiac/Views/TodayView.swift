import SwiftUI

struct TodayView: View {
    @EnvironmentObject private var store: PawdiacStore

    var body: some View {
        NavigationStack {
            ZStack {
                CosmicBackground()
                ScrollView {
                    VStack(alignment: .leading, spacing: 18) {
                        HStack(spacing: 14) {
                            Image("PawdiacLogo").resizable().scaledToFill().frame(width: 62, height: 62).clipShape(RoundedRectangle(cornerRadius: 16))
                            VStack(alignment: .leading) {
                                Text("PAWDIAC").font(.caption.weight(.bold)).tracking(3).foregroundStyle(Theme.gold)
                                Text("The stars speak to them too.").font(.headline).foregroundStyle(.white)
                            }
                        }
                        Text(store.reading.title).font(.system(size: 34, weight: .medium, design: .serif)).foregroundStyle(.white)
                        ReadingSection(title: "Today's Energy", text: store.reading.todaysEnergy)
                        ReadingSection(title: "What to Watch", text: store.reading.whatToWatch)
                        ReadingSection(title: "A Moment of Connection", text: store.reading.connectionMoment)
                        ReadingSection(title: "Cosmic Snapshot", text: store.reading.snapshot)
                    }
                    .padding(20)
                }
            }
            .navigationTitle(store.dog.name)
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

private struct ReadingSection: View {
    let title: String
    let text: String
    var body: some View {
        Card {
            VStack(alignment: .leading, spacing: 10) {
                Text(title).font(.headline).foregroundStyle(Theme.gold)
                Text(text).lineSpacing(6).foregroundStyle(Theme.stardust)
            }
        }
    }
}

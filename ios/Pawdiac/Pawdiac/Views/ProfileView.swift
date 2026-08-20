import SwiftUI

struct ProfileView: View {
    @EnvironmentObject private var store: PawdiacStore
    var body: some View {
        NavigationStack {
            ZStack {
                CosmicBackground()
                ScrollView {
                    VStack(spacing: 16) {
                        Card {
                            VStack(alignment: .leading, spacing: 10) {
                                Text(store.dog.name).font(.system(size: 42, weight: .medium, design: .serif)).foregroundStyle(.white)
                                Text("\(store.dog.sign.rawValue) Dog").font(.title3.weight(.semibold)).foregroundStyle(Theme.gold)
                                Text(store.dog.sign.nature).foregroundStyle(Theme.stardust)
                                Text("Life Path \(store.dog.lifePathNumber) • \(store.dog.breed)").foregroundStyle(Theme.silver)
                            }
                        }
                        GaugeCard(title: "Energy", value: store.dog.energyLevel)
                        GaugeCard(title: "Attachment", value: store.dog.attachmentStyle)
                        GaugeCard(title: "Food Motivation", value: store.dog.foodMotivation)
                        GaugeCard(title: "Sociability", value: store.dog.sociability)
                        GaugeCard(title: "Sensitivity", value: store.dog.sensitivity)
                    }
                    .padding(20)
                }
            }
            .navigationTitle("Profile")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

private struct GaugeCard: View {
    let title: String
    let value: Double
    var body: some View {
        Card {
            VStack(alignment: .leading, spacing: 10) {
                HStack { Text(title).foregroundStyle(.white); Spacer(); Text("\(Int(value * 100))%").foregroundStyle(Theme.gold) }
                ProgressView(value: value).tint(Theme.gold)
            }
        }
    }
}

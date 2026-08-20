import SwiftUI

@main
struct PawdiacApp: App {
    @StateObject private var store = PawdiacStore()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(store)
        }
    }
}

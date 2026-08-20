import SwiftUI

struct RootView: View {
    @State private var selectedTab = ScreenshotTab.initial

    var body: some View {
        TabView(selection: $selectedTab) {
            TodayView()
                .tabItem { Label("Today", systemImage: "moon.stars.fill") }
                .tag(ScreenshotTab.today)
            ProfileView()
                .tabItem { Label("Profile", systemImage: "pawprint.fill") }
                .tag(ScreenshotTab.profile)
            ObservationView()
                .tabItem { Label("Observe", systemImage: "sparkle.magnifyingglass") }
                .tag(ScreenshotTab.observe)
        }
        .tint(Theme.gold)
        .preferredColorScheme(.dark)
    }
}

private enum ScreenshotTab: Hashable {
    case today
    case profile
    case observe

    static var initial: ScreenshotTab {
        let args = ProcessInfo.processInfo.arguments
        guard let index = args.firstIndex(of: "-screenshotTab"), args.indices.contains(index + 1) else {
            return .today
        }

        switch args[index + 1].lowercased() {
        case "profile": return .profile
        case "observe": return .observe
        default: return .today
        }
    }
}

enum Theme {
    static let midnight = Color(red: 0.05, green: 0.04, blue: 0.17)
    static let indigo = Color(red: 0.10, green: 0.06, blue: 0.24)
    static let gold = Color(red: 0.96, green: 0.78, blue: 0.26)
    static let amber = Color(red: 0.91, green: 0.58, blue: 0.43)
    static let stardust = Color(red: 0.94, green: 0.94, blue: 1.0)
    static let silver = Color(red: 0.72, green: 0.72, blue: 0.82)
}

struct CosmicBackground: View {
    var body: some View {
        LinearGradient(colors: [Theme.midnight, Theme.indigo, .black], startPoint: .topLeading, endPoint: .bottomTrailing)
            .ignoresSafeArea()
    }
}

struct Card<Content: View>: View {
    let content: Content
    init(@ViewBuilder content: () -> Content) { self.content = content() }
    var body: some View {
        content
            .padding(18)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(.white.opacity(0.055), in: RoundedRectangle(cornerRadius: 8, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 8, style: .continuous).stroke(Theme.gold.opacity(0.16), lineWidth: 1))
    }
}

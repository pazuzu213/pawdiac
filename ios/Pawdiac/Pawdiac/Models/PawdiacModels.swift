import Foundation

enum ZodiacSign: String, CaseIterable, Identifiable, Codable {
    case aries = "Aries", taurus = "Taurus", gemini = "Gemini", cancer = "Cancer"
    case leo = "Leo", virgo = "Virgo", libra = "Libra", scorpio = "Scorpio"
    case sagittarius = "Sagittarius", capricorn = "Capricorn", aquarius = "Aquarius", pisces = "Pisces"

    var id: String { rawValue }

    var nature: String {
        switch self {
        case .aries: return "Fearless, first, pure fire energy."
        case .taurus: return "Grounded, comfort-seeking, stubborn in love."
        case .gemini: return "Curious, socially electric, dual-natured."
        case .cancer: return "Deeply bonded, protective, emotionally sensitive."
        case .leo: return "Radiant, dramatic, born to be seen."
        case .virgo: return "Perceptive, routine-driven, quietly devoted."
        case .libra: return "Social, harmony-seeking, lover of peace."
        case .scorpio: return "Intense, intuitive, fiercely loyal."
        case .sagittarius: return "Wild, freedom-loving, forever curious."
        case .capricorn: return "Dignified, steady, old soul energy."
        case .aquarius: return "Eccentric, independent, follows no one."
        case .pisces: return "Dreamy, empathic, feels everything deeply."
        }
    }
}

struct DogProfile: Identifiable, Codable, Equatable {
    var id = UUID()
    var name: String
    var birthday: Date
    var breed: String
    var energyLevel: Double
    var attachmentStyle: Double
    var foodMotivation: Double
    var sociability: Double
    var sensitivity: Double

    var sign: ZodiacSign { ZodiacCalculator.sign(for: birthday) }
    var lifePathNumber: Int { ZodiacCalculator.lifePathNumber(for: birthday) }
}

struct DailyReading: Identifiable, Codable, Equatable {
    var id = UUID()
    var title: String
    var todaysEnergy: String
    var whatToWatch: String
    var connectionMoment: String
    var snapshot: String
}

enum AccuracyRating: String, CaseIterable, Identifiable, Codable {
    case spotOn = "Spot on"
    case somewhat = "Somewhat"
    case missed = "Missed"
    var id: String { rawValue }
}

struct ObservationLog: Identifiable, Codable, Equatable {
    var id = UUID()
    var date: Date
    var accuracy: AccuracyRating
    var energy: String
    var mood: String
    var notes: String
}

enum ZodiacCalculator {
    static func sign(for date: Date) -> ZodiacSign {
        let c = Calendar.current.dateComponents([.month, .day], from: date)
        let m = c.month ?? 1
        let d = c.day ?? 1
        switch (m, d) {
        case (3, 21...31), (4, 1...19): return .aries
        case (4, 20...30), (5, 1...20): return .taurus
        case (5, 21...31), (6, 1...20): return .gemini
        case (6, 21...30), (7, 1...22): return .cancer
        case (7, 23...31), (8, 1...22): return .leo
        case (8, 23...31), (9, 1...22): return .virgo
        case (9, 23...30), (10, 1...22): return .libra
        case (10, 23...31), (11, 1...21): return .scorpio
        case (11, 22...30), (12, 1...21): return .sagittarius
        case (12, 22...31), (1, 1...19): return .capricorn
        case (1, 20...31), (2, 1...18): return .aquarius
        default: return .pisces
        }
    }

    static func lifePathNumber(for date: Date) -> Int {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyyMMdd"
        var total = formatter.string(from: date).compactMap { Int(String($0)) }.reduce(0, +)
        while total > 9 && total != 11 && total != 22 {
            total = String(total).compactMap { Int(String($0)) }.reduce(0, +)
        }
        return total
    }
}

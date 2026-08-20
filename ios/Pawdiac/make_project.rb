require "xcodeproj"

project_path = File.expand_path("Pawdiac.xcodeproj", __dir__)
project = Xcodeproj::Project.new(project_path)
target = project.new_target(:application, "Pawdiac", :ios, "17.0")
group = project.main_group.new_group("Pawdiac", "Pawdiac")

Dir[File.join(__dir__, "Pawdiac", "**", "*.swift")].sort.each do |file|
  ref = group.new_file(file.sub("#{__dir__}/Pawdiac/", ""))
  target.add_file_references([ref])
end

target.resources_build_phase.add_file_reference(group.new_file("Assets.xcassets"))

target.build_configurations.each do |config|
  s = config.build_settings
  s["ASSETCATALOG_COMPILER_APPICON_NAME"] = "AppIcon"
  s["ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME"] = "AccentColor"
  s["CODE_SIGN_STYLE"] = "Automatic"
  s["GENERATE_INFOPLIST_FILE"] = "YES"
  s["INFOPLIST_KEY_CFBundleDisplayName"] = "Pawdiac"
  s["IPHONEOS_DEPLOYMENT_TARGET"] = "17.0"
  s["MARKETING_VERSION"] = "0.1.0"
  s["CURRENT_PROJECT_VERSION"] = "1"
  s["DEVELOPMENT_TEAM"] = "57LBSM2N3U"
  s["PRODUCT_BUNDLE_IDENTIFIER"] = "com.sunnydays.pawdiac"
  s["SWIFT_VERSION"] = "6.0"
  s["TARGETED_DEVICE_FAMILY"] = "1,2"
end

project.build_configurations.each do |config|
  config.build_settings["IPHONEOS_DEPLOYMENT_TARGET"] = "17.0"
  config.build_settings["SWIFT_VERSION"] = "6.0"
end

project.recreate_user_schemes
project.save

import SwiftUI
import AppKit
import ApplicationServices

@main
struct LauncherApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .onAppear {
                    if let window = NSApplication.shared.windows.first {
                        let borderless = BorderlessWindow(
                            contentRect: window.frame,
                            styleMask: [.borderless, .fullSizeContentView],
                            backing: .buffered,
                            defer: false
                        )
                        borderless.contentView = window.contentView
                        borderless.backgroundColor = .clear
                        borderless.isMovableByWindowBackground = true
                        borderless.makeKeyAndOrderFront(nil)
                        borderless.level = NSWindow.Level(rawValue: Int(CGWindowLevelForKey(.desktopWindow)))
                        NSApplication.shared.activate(ignoringOtherApps: true)
                        let options = [kAXTrustedCheckOptionPrompt.takeUnretainedValue() as String: true]
                        AXIsProcessTrustedWithOptions(options as CFDictionary)
                        window.close()
                    }
                }
        }
        .windowStyle(.hiddenTitleBar)
        .windowResizability(.contentSize)
    }
}

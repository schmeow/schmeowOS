import SwiftUI

struct ContentView: View {
    @State private var query = ""
    @FocusState private var isSearchFocused: Bool
    @State private var hoveredApp: String? = nil
    
    
    let apps = [
        ("VS Code", "Visual Studio Code", "", ""),
        ("Spotify", "", "", "https://open.spotify.com"),
        ("Discord", "Discord", "", ""),
        ("Terminal", "", "/System/Applications/Utilities/Terminal.app", ""),
        ("Safari", "", "", "https://www.google.com"),
        ("Messages", "", "", "https://www.google.com"),
        ("Files", "", "", "https://www.google.com"),
        ("School", "", "", ""),
    ]
    
    func launch(_ appName: String) {
        let workspace = NSWorkspace.shared
        if let url = workspace.urlForApplication(withBundleIdentifier: appName) {
            workspace.openApplication(at: url, configuration: NSWorkspace.OpenConfiguration())
        } else {
            workspace.openApplication(at: URL(fileURLWithPath: "/Applications/\(appName).app"), configuration: NSWorkspace.OpenConfiguration())
        }
    }
    
    func shell(_ command: String) {
        let process = Process()
        process.launchPath = "/bin/bash"
        process.arguments = ["-c", command]
        process.launch()
    }
    
    var body: some View {
        VStack {
            HStack{
                Image(systemName: "magnifyingglass")
                    .foregroundColor(.gray)
                TextField("Search...", text: $query)
                    .textFieldStyle(.plain)
                    .focused($isSearchFocused)
            }
            .padding(10)
            .background(Color.white.opacity(0.9))
            .cornerRadius(20)
            
            
            ForEach(apps.filter { app in query.isEmpty || app.0.lowercased().contains(query.lowercased())
            }, id: \.0) { app in
                HStack {
                    Text(app.0)
                        .foregroundColor(Color(red: 0.46, green: 0.61, blue: 0.47))
                        .font(.custom("Doto-Medium", size: 16))
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, 14)
                .padding(.vertical, 8)
                .background(hoveredApp == app.0 ? Color.white.opacity(0.1) : Color.clear)
                .cornerRadius(10)
                .onHover { isHovered in
                    hoveredApp = isHovered ? app.0 : nil
                }
                .onTapGesture {
                    if app.0 == "School" {
                        NSWorkspace.shared.open(URL(fileURLWithPath: "/Applications/Safari.app"))
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                            let src = CGEventSource(stateID: .hidSystemState)
                            let keyDown = CGEvent(keyboardEventSource: src, virtualKey: 0x12, keyDown: true)
                            let keyUp = CGEvent(keyboardEventSource: src, virtualKey: 0x12, keyDown: false)
                            keyDown?.flags = [.maskCommand, .maskShift, .maskAlternate]
                            keyUp?.flags = [.maskCommand, .maskShift, .maskAlternate]
                            keyDown?.post(tap: .cgSessionEventTap)
                            keyUp?.post(tap: .cgSessionEventTap)
                        }
                    } else if app.0 == "Safari" {
                        shell("touch ~/.personal_trigger")
                    } else if !app.3.isEmpty {
                        NSWorkspace.shared.open(URL(string: app.3)!)
                    } else if !app.2.isEmpty {
                        NSWorkspace.shared.openApplication(at: URL(fileURLWithPath: app.2), configuration: NSWorkspace.OpenConfiguration())
                    } else {
                        launch(app.1)
                    }
                }
            }
        }
        .frame(width: 200)
        .font(.custom("Doto-Medium", size: 13))
        .padding(16)
        .background(Color(red: 0.06, green: 0.12, blue: 0.06).opacity(0.6))
        .cornerRadius(18)
        .onAppear(){
            isSearchFocused = true
        }
    }
}

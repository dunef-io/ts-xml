export default {
    "extensionsToTreatAsEsm": [
        ".ts"
    ],
    "moduleFileExtensions": [
        "ts",
        "js",
        "json",
        "node"
    ],
    "preset": "ts-jest/presets/default-esm",
    "testEnvironment": "node",
    "moduleNameMapper": {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    }
}
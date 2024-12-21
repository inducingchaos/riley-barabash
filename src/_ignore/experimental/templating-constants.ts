/* eslint-disable @typescript-eslint/no-unused-vars */
const regions = [
    "US",
    "CA",
    "MX",
    "BR",
    "DE",
    "FR",
    "IT",
    "ES",
    "GB",
    "IN",
    "AU",
    "JP",
    "NL",
    "SG",
    "PL",
    "TR",
    "RU",
    "CN",
    "KR",
    "ZA",
    "PH",
    "MY",
    "TH",
    "ID",
    "VN",
    "AR",
    "CO",
    "EG",
    "PK",
    "CL",
    "ZA",
    "MX"
]

type Region = (typeof regions)[number]

const components = {
    h1: "components.H1",
    card: "components.Card",
    button: "components.Button"
}

const aliases = {
    h1: ["H1", "heading 1", "header 1", "heading one", "header one"]
}

const parameterOptions = {
    color: [],
    direction: ["horizontal", "vertical"],
    padding: ["small", "medium", "large", "none"],
    cornerRadius: ["small", "medium", "large", "none"]
}

const componentParameters = {
    h1: ["color", "padding"],
    card: ["color", "padding", "direction", "cornerRadius"]
}

/**
 * Base types for the prompt system
 */

export type StyleExample = {
    context: string
    example: string
}

export type FormattingRules = {
    structure: string[]
    length: string
    style: string[]
}

export type AgentContext = {
    role: string
    purpose: string
    constraints?: string[]
}

export type PromptContext = {
    isGenerating: boolean
    isLastMessageFromAI: boolean
    lastMessage?: {
        content: string
        role: "user" | "assistant"
    }
}

export type PromptFragment<T extends PromptContext = PromptContext> = {
    id: string
    content: string
    condition?: (context: T) => boolean
}

export type Agent<T extends PromptContext = PromptContext> = {
    id: string
    context: AgentContext
    formatting: FormattingRules
    styleExamples: StyleExample[]
    fragments: PromptFragment<T>[]
    compose: (context?: T) => string
}

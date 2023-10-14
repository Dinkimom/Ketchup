export type Command = {
  id: string
  name: CommandName
  selector: string
  text?: string
}

export enum CommandName {
  whileVisible = "whileVisible",
  end = "end",
  find = "find",
  click = "click",
  waitFor = "waitFor",
  delay = "delay"
}
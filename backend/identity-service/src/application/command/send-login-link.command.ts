export class SendLoginLinkCommand {
  constructor(
    public readonly email: string,
    public readonly redirectUrl: string,
  ) {}
}

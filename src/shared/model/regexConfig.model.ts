class RegexConfigModel {
  regexName: string;
  regexDisplayName: string;
  regexDescription: string;

  constructor(
    regexName: string,
    regexDescription: string,
    regexDisplayName: string,
  ) {
    this.regexName = regexName;
    this.regexDisplayName = regexDisplayName;
    this.regexDescription = regexDescription;
  }
}

export default RegexConfigModel;

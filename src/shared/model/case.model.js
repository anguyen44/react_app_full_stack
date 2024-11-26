class CaseModel {
  constructor(
    oid,
    state,
    createTimestamp,
    objects,
    targets,
    asker,
    approvers,
    actionType,
    typology,
    teamInfo,
    portfolioInfo,
    closeTimestamp,
    treatedCaseApprover,
    caseValidationType,
  ) {
    this.oid = oid;
    this.state = state;
    this.createTimestamp = createTimestamp;
    this.objects = objects;
    this.targets = targets;
    this.asker = asker;
    this.approvers = approvers;
    this.actionType = actionType;
    this.typology = typology;
    this.teamInfo = teamInfo;
    this.portfolioInfo = portfolioInfo;
    this.closeTimestamp = closeTimestamp;
    this.treatedCaseApprover = treatedCaseApprover;
    this.caseValidationType = caseValidationType;
  }
}

export default CaseModel;

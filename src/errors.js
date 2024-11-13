// 0-1) 이메일 중복 오류 처리
export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  // 필요에 따라 오류 데이터를 추가로 담을 수 있도록 구현
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 0-2) 없는 지역에 가게를 추가 요청 했을 시 오류 처리
export class InvaildRegionError extends Error {
  errorCode = "R001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 0-3) 없는 가게에 미션을 추가 요청 했을 시 오류 처리
export class StoreNotFoundError extends Error {
  errorCode = "S001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 0-4) 이미 도전 중인 미션을 사용자 미션에 추가 요청추가했을 시 오류 처리
export class MissionInProgressError extends Error {
  errorCode = "M001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 0-4) +) 이미 완료된 미션을 사용자 미션에 추가 요청 했을 시 오류 처리
export class MissionCompletedError extends Error {
  errorCode = "M001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

//----------------------------------------------------------------------------------------------
// 1) 리뷰 조회 시 사용자를 찾을 수 없을 시 오류 처리
export class UserNotFound extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 2) 특정 가게 미션 목록 조회 시 가게를 찾을 수 없을 경우 오류 처리 -> StoreNotFound 로 통일
export class StoreMissionNotFoundError extends Error {
  errorCode = "SM001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 3) 없는 사용자의 미션을 조회할 경우 오류 처리 -> UserNotFound로 통일
export class UserMissionNotFoundError extends Error {
  errorCode = "UM001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 4) 이미 진행 완료인 미션을 완료 상태 변경 요청 시 오류 처리 -> MissionCOmpletedError 로 통일...
export class MissionAlreadyCompletedError extends Error {
  errorCode = "UM002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

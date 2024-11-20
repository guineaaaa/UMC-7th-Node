export class DuplicateUserEmailError extends Error {
  errorCode = "4009_USER_DUPLICATE";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 없는 지역에 가게를 추가 요청 했을 시 오류 처리
export class InvaildRegionError extends Error {
  errorCode = "404_INVAILD_REGION";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 없는 가게에 미션을 추가 요청 했을 시 오류 처리
export class StoreNotFoundError extends Error {
  errorCode = "404_STORE_NOT_FOUND";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 이미 도전중이거나 완료된 미션에 추가 요청 했을 시 오류
export class MissionStateError extends Error {
  errorCode = "409_MISSION_STATE";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 사용자를 찾을 수 없을 시 오류 처리
export class UserNotFoundError extends Error {
  errorCode = "404_USER_NOT_FOUND";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

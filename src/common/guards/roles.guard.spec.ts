/**
 * RolesGuard 단위 테스트
 * @Roles() 데코레이터로 지정한 권한과 요청 사용자(JWT payload)의 role을 비교하는
 * 인가(authorization) 로직을 검증한다.
 */
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RolesGuard } from "./roles.guard";
import { Role } from "../enums";

const createContext = (user?: { role: Role }): ExecutionContext =>
  ({
    getHandler: () => jest.fn(),
    getClass: () => jest.fn(),
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
  }) as unknown as ExecutionContext;

describe("RolesGuard", () => {
  let reflector: Reflector;
  let guard: RolesGuard;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it("@Roles() 제한이 없는 핸들러는 통과시킨다", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(undefined);
    expect(guard.canActivate(createContext())).toBe(true);
  });

  it("요청에 인증된 사용자가 없으면 거부한다", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue([Role.ADMIN]);
    expect(guard.canActivate(createContext(undefined))).toBe(false);
  });

  it("사용자 role이 허용된 역할 목록에 포함되면 통과시킨다", () => {
    jest
      .spyOn(reflector, "getAllAndOverride")
      .mockReturnValue([Role.ADMIN, Role.TRAINER]);
    expect(guard.canActivate(createContext({ role: Role.TRAINER }))).toBe(true);
  });

  it("사용자 role이 허용된 역할 목록에 없으면 거부한다", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue([Role.ADMIN]);
    expect(guard.canActivate(createContext({ role: Role.MEMBER }))).toBe(false);
  });
});

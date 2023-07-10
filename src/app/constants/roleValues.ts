import { Roles } from "./roleConstants";

export const RolesMap = {
    [Roles.CHALLENGER_VAL]: Roles.CHALLENGER_DESC,
    [Roles.MASTER_VAL]: Roles.MASTER_DESC,
    [Roles.DIAMOND_VAL]: Roles.DIAMOND_DESC,
    [Roles.PLATINUM_VAL]: Roles.PLATINUM_DESC,
    [Roles.GOLD_VAL]: Roles.GOLD_DESC,
  };

  export const RolesOptions = [
    { code: Roles.DIAMOND_DESC, value: Roles.DIAMOND_VAL, description: Roles.DIAMOND_DESC},
    { code: Roles.PLATINUM_DESC, value: Roles.PLATINUM_VAL, description: Roles.PLATINUM_DESC },
    { code: Roles.GOLD_DESC, value: Roles.GOLD_VAL, description: Roles.GOLD_DESC },
  ];
import { HistoryService } from './history/history.service';
import { SyntheseService } from './synthese/synthese.service';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { SiteService } from './site/site.service';
import { VehiculeService } from './vehicule/vehicule.service';
import { EnginService } from './engin/engin.service';
import { StatsService } from './stats/stats.service';

export const services: any[] = [
    HistoryService,
    SyntheseService,
    UserService,
    RoleService,
    SiteService,
    VehiculeService,
    EnginService,
    StatsService
];

export * from './history/history.service';
export * from './synthese/synthese.service';
export * from './user/user.service';
export * from './role/role.service';
export * from './site/site.service';
export * from './vehicule/vehicule.service';
export * from './engin/engin.service';
export * from './stats/stats.service';
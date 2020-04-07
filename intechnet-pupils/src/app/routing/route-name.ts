import { environment } from 'src/environments/environment';

/**
 * @summary Defines all routes constants
 */
export enum RouteName {
    // Authentication
    LOGIN = 'login',
    REGISTER = 'register',

    // Externals
    CONTACT_EXTERNAL =  'contact',
    LOGIN_MODERATOR_EXTERNAL = 'login',
    REGISTER_MODERATOR_EXTERNAL = 'register',

    // Profil
    BOARD = 'board',

    // Pupil hub management
    HUB_DETAILS = 'hubs/details/:id',
    HUBS = 'Hubs',
    JOIN = 'join',

    // Global / Homepage
    ROOT = ''
}

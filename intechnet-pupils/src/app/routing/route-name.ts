import { environment } from 'src/environments/environment';

/**
 * @summary Defines all routes constants
 */
export enum RouteName {
    // Authentication
    LOGIN = 'login',

    // Redirect to moderator login
    LOGIN_MODERATOR_EXTERNAL = 'login',

    // Redirect to moderator register
    REGISTER_MODERATOR_EXTERNAL = 'register',

    // Register
    REGISTER = 'register',

    // Profil
    BOARD = 'board',

    // Hubs
    HUBS = 'Hubs',
    JOIN = 'join',

    // Contact
    CONTACT_EXTERNAL =  'contact',

    // Global / Homepage
    HOMEPAGE = 'login',
    ROOT = ''
}

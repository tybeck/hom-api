import {Profile as FacebookProfileAuth} from 'passport-facebook';
import {Profile as GoogleProfileAuth} from 'passport-google-oauth20';
import {Profile as TwitterProfileAuth} from 'passport-twitter';

export type Token = {
  accessToken: string;
};

export type FacebookProfile = FacebookProfileAuth & Token;
export type GoogleProfile = GoogleProfileAuth & Token;
export type TwitterProfile = TwitterProfileAuth & Token;

export type HOMFacebookProfile = FacebookProfile & Token;
export type HOMGoogleProfile = GoogleProfile & Token;
export type HOMTwitterProfile = TwitterProfile & Token;

export type Profile = FacebookProfile | GoogleProfile | TwitterProfile;

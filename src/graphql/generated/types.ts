import type { Role } from '@prisma/client';
import type { Gender } from '@prisma/client';
import type { PhoneStatus } from '@/schemas/adminSchemas.js';
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GraphQLContext } from '../setup.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = undefined | T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date | string; output: Date | string; }
};

export type AdminGetUsersInput = {
  gender?: InputMaybe<Gender>;
  isDeactivated?: InputMaybe<Scalars['Boolean']['input']>;
  isTwoFactorEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  phoneStatus?: InputMaybe<PhoneStatus>;
  role?: InputMaybe<Array<Role>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ChangePasswordInput = {
  password: Scalars['String']['input'];
};

export { Gender };

export type Mutation = {
  __typename?: 'Mutation';
  addPhone: StatusResponse;
  adminDeleteUser: StatusResponse;
  adminDisableOtp: StatusResponse;
  adminSetDeactivity: StatusResponse;
  adminSetRole: StatusResponse;
  adminVerifyEmail: StatusResponse;
  changePassword: StatusResponse;
  deleteAccount: StatusResponse;
  deletePhone: StatusResponse;
  disableOtp: StatusResponse;
  enableOtp: StatusResponse;
  sendOtpToUser: StatusResponse;
  updateProfile: User;
  verifyEnableOtp: StatusResponse;
  verifyPhone: StatusResponse;
};


export type MutationAddPhoneArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationAdminDeleteUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationAdminDisableOtpArgs = {
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminSetDeactivityArgs = {
  isDeactivated: Scalars['Boolean']['input'];
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminSetRoleArgs = {
  role: Role;
  userId: Scalars['ID']['input'];
};


export type MutationAdminVerifyEmailArgs = {
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationUpdateProfileArgs = {
  data: UpdateProfileInput;
};


export type MutationVerifyEnableOtpArgs = {
  code: Scalars['String']['input'];
};


export type MutationVerifyPhoneArgs = {
  code: Scalars['String']['input'];
};

export { PhoneStatus };

export type Query = {
  __typename?: 'Query';
  adminGetUsers: Array<User>;
  getProfile?: Maybe<User>;
};


export type QueryAdminGetUsersArgs = {
  data: AdminGetUsersInput;
};

export { Role };

export type StatusResponse = {
  __typename?: 'StatusResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type UpdateProfileInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  isPhoneVerified?: Maybe<Scalars['Boolean']['output']>;
  isTwoFactorEnabled?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  role: Role;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdminGetUsersInput: AdminGetUsersInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ChangePasswordInput: ChangePasswordInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Gender: Gender;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PhoneStatus: PhoneStatus;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Role: Role;
  StatusResponse: ResolverTypeWrapper<StatusResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateProfileInput: UpdateProfileInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdminGetUsersInput: AdminGetUsersInput;
  Boolean: Scalars['Boolean']['output'];
  ChangePasswordInput: ChangePasswordInput;
  Date: Scalars['Date']['output'];
  ID: Scalars['ID']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  StatusResponse: StatusResponse;
  String: Scalars['String']['output'];
  UpdateProfileInput: UpdateProfileInput;
  User: User;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GenderResolvers = EnumResolverSignature<{ female?: any, male?: any, other?: any }, ResolversTypes['Gender']>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addPhone?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationAddPhoneArgs, 'phoneNumber'>>;
  adminDeleteUser?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationAdminDeleteUserArgs, 'userId'>>;
  adminDisableOtp?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationAdminDisableOtpArgs, 'userIds'>>;
  adminSetDeactivity?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationAdminSetDeactivityArgs, 'isDeactivated' | 'userIds'>>;
  adminSetRole?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationAdminSetRoleArgs, 'role' | 'userId'>>;
  adminVerifyEmail?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationAdminVerifyEmailArgs, 'userIds'>>;
  changePassword?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'data'>>;
  deleteAccount?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType>;
  deletePhone?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType>;
  disableOtp?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType>;
  enableOtp?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType>;
  sendOtpToUser?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType>;
  updateProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'data'>>;
  verifyEnableOtp?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationVerifyEnableOtpArgs, 'code'>>;
  verifyPhone?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationVerifyPhoneArgs, 'code'>>;
};

export type PhoneStatusResolvers = EnumResolverSignature<{ none?: any, unverified?: any, verified?: any }, ResolversTypes['PhoneStatus']>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  adminGetUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryAdminGetUsersArgs, 'data'>>;
  getProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RoleResolvers = EnumResolverSignature<{ admin?: any, moderator?: any, user?: any }, ResolversTypes['Role']>;

export type StatusResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['StatusResponse'] = ResolversParentTypes['StatusResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPhoneVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isTwoFactorEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Date?: GraphQLScalarType;
  Gender?: GenderResolvers;
  Mutation?: MutationResolvers<ContextType>;
  PhoneStatus?: PhoneStatusResolvers;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers;
  StatusResponse?: StatusResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


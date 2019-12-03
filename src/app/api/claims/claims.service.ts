import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import {
    ClaimsService as APIClaimsService,
    Claim,
    StatusModificationUnit,
    Modification
} from '../../api-codegen/claim-management';
import { ClaimsWithToken } from './models';
import { genXRequestID } from '../utils';
import { noContinuationToken, mapResult } from '../../custom-operators';

export const ClaimStatus = StatusModificationUnit.StatusEnum;

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService) {}

    searchClaims(
        limit: number,
        claimStatuses?: StatusModificationUnit.StatusEnum[],
        continuationToken?: string
    ): Observable<ClaimsWithToken> {
        return this.claimsService.searchClaims(
            genXRequestID(),
            limit,
            undefined,
            continuationToken,
            claimStatuses || Object.values(StatusModificationUnit.StatusEnum)
        );
    }

    search1000Claims(claimStatuses?: StatusModificationUnit.StatusEnum[], cacheSize = 1): Observable<Claim[]> {
        return this.searchClaims(1000, claimStatuses).pipe(
            noContinuationToken,
            mapResult,
            shareReplay(cacheSize)
        );
    }

    getClaimByID(claimID: number): Observable<Claim> {
        const changeset = [
            {
                modificationID: 66,
                createdAt: '2019-11-21T18:30:00.000000Z',
                userInfo: {
                    userId: '',
                    email: '',
                    username: '',
                    userType: 'external_user'
                },
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: {
                        claimModificationType: 'DocumentModificationUnit',
                        documentId: '7dfbc2fe-7ac4-416a-9f96-documentId1',
                        documentModification: {
                            documentModificationType: 'DocumentCreated'
                        }
                    }
                }
            },
            {
                modificationID: 67,
                createdAt: '2019-11-21T18:40:00.000000Z',
                userInfo: {
                    userId: '',
                    email: '',
                    username: '',
                    userType: 'external_user'
                },
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: {
                        claimModificationType: 'FileModificationUnit',
                        fileId: '7dfbc2fe-7ac4-416a-9f96-fileId1',
                        fileModification: {
                            fileModificationType: 'FileCreated'
                        }
                    }
                }
            },
            {
                modificationID: 68,
                createdAt: '2019-11-21T18:41:00.000000Z',
                userInfo: {
                    userId: '',
                    email: '',
                    username: '',
                    userType: 'external_user'
                },
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: {
                        claimModificationType: 'FileModificationUnit',
                        fileId: '7dfbc2fe-7ac4-416a-9f96-fileId2',
                        fileModification: {
                            fileModificationType: 'FileCreated'
                        }
                    }
                }
            },
            {
                modificationID: 69,
                createdAt: '2019-11-21T18:43:00.000000Z',
                userInfo: {
                    userId: '',
                    email: '',
                    username: '',
                    userType: 'external_user'
                },
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: {
                        claimModificationType: 'StatusModificationUnit',
                        status: 'review',
                        statusModification: {
                            statusModificationType: 'StatusChanged'
                        }
                    }
                }
            },
            {
                modificationID: 70,
                createdAt: '2019-11-22T10:00:00.000000Z',
                userInfo: {
                    userId: '',
                    email: '',
                    username: '',
                    userType: 'internal_user'
                },
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: {
                        claimModificationType: 'CommentModificationUnit',
                        commentId: '7dfbc2fe-7ac4-416a-9f96-commentId1',
                        commentModification: {
                            commentModificationType: 'CommentCreated'
                        }
                    }
                }
            },
            {
                modificationID: 71,
                createdAt: '2019-11-22T10:01:00.000000Z',
                userInfo: {
                    userId: '',
                    email: '',
                    username: '',
                    userType: 'internal_user'
                },
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: {
                        claimModificationType: 'StatusModificationUnit',
                        status: 'pendingAcceptance',
                        statusModification: {
                            statusModificationType: 'StatusChanged'
                        }
                    }
                }
            },
            {
                modificationID: 72,
                createdAt: '2019-11-22T10:02:00.000000Z',
                userInfo: {
                    userId: '',
                    email: '',
                    username: '',
                    userType: 'external_user'
                },
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: {
                        claimModificationType: 'StatusModificationUnit',
                        status: 'pending',
                        statusModification: {
                            statusModificationType: 'StatusChanged'
                        }
                    }
                }
            },
            {
                modificationID: 73,
                createdAt: '2019-11-22T10:03:00.000000Z',
                userInfo: {
                    userId: '',
                    email: '',
                    username: '',
                    userType: 'external_user'
                },
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: {
                        claimModificationType: 'StatusModificationUnit',
                        status: 'accepted',
                        statusModification: {
                            statusModificationType: 'StatusChanged'
                        }
                    }
                }
            },
            {
                modificationID: 74,
                createdAt: '2019-11-22T10:04:00.000000Z',
                userInfo: {
                    userId: '',
                    email: '',
                    username: '',
                    userType: 'external_user'
                },
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: {
                        claimModificationType: 'StatusModificationUnit',
                        status: 'denied',
                        statusModification: {
                            statusModificationType: 'StatusChanged'
                        }
                    }
                }
            },
            {
                modificationID: 75,
                createdAt: '2019-11-22T10:05:00.000000Z',
                userInfo: {
                    userId: '',
                    email: '',
                    username: '',
                    userType: 'external_user'
                },
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: {
                        claimModificationType: 'StatusModificationUnit',
                        status: 'revoked',
                        statusModification: {
                            statusModificationType: 'StatusChanged'
                        }
                    }
                }
            },
            {
                modificationID: 76,
                createdAt: '2019-11-22T10:10:00.000000Z',
                userInfo: {
                    userId: '',
                    email: '',
                    username: '',
                    userType: 'external_user'
                },
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: {
                        claimModificationType: 'CommentModificationUnit',
                        commentId: '7dfbc2fe-7ac4-416a-9f96-commentId2',
                        commentModification: {
                            commentModificationType: 'CommentCreated'
                        }
                    }
                }
            }
        ];
        return of({
            id: claimID,
            status: 'pending',
            changeset,
            revision: 0,
            createdAt: '2019-12-02T15:37:10.010015Z',
            updatedAt: '2019-12-02T15:37:10.010099Z'
        } as any);
    }

    createClaim(changeset: Modification[]): Observable<Claim> {
        return this.claimsService.createClaim(genXRequestID(), changeset);
    }

    revokeClaimByID(claimID: number, claimRevision: number): Observable<void> {
        return this.claimsService.revokeClaimByID(genXRequestID(), claimID, claimRevision);
    }
}

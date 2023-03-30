import { MovementPayment } from './MovementPayment.model';
import { MovementTopUp } from './MovementTopUp.model';
import { MovementTransference } from './MovementTransference.model';

export type Movement = MovementPayment | MovementTopUp | MovementTransference;

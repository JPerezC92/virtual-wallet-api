export interface Adapter<ToAdapt, AdaptResult = unknown> {
	(toAdapt: ToAdapt): AdaptResult;
}

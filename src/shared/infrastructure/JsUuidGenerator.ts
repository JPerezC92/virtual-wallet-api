import { v4 } from "uuid";

import { UuidGenerator } from "@/Shared/domain";

export const JsUuidGenerator = (): UuidGenerator => {
	return {
		generate: () => v4(),
	};
};

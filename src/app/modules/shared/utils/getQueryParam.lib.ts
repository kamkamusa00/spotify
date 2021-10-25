import { ActivatedRoute } from "@angular/router";

export function getQueryParam (route:ActivatedRoute,paramName:string):string | null{
  return route.snapshot.queryParamMap.get(paramName) || null;
}

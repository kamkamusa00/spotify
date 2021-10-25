import { ActivatedRoute } from "@angular/router";

export function getRouteParam (route:ActivatedRoute,paramName:string):string | null{
  return route.snapshot.paramMap.get(paramName) || null;
}

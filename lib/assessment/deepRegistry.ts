import type { BusinessType, DeepQuestion } from "./types";
import {
  ecommerceDeepQuestions,
  restaurantDeepQuestions,
  retailDeepQuestions,
  saasDeepQuestions,
} from "./deepQuestions";

export function getDeepQuestions(businessType: BusinessType): DeepQuestion[] {
  switch (businessType) {
    case "restaurant":
      return restaurantDeepQuestions;
    case "ecommerce":
      return ecommerceDeepQuestions;
    case "saas":
      return saasDeepQuestions;
    case "retail":
      return retailDeepQuestions;
    case "other":
    default:
      return ecommerceDeepQuestions;
  }
}

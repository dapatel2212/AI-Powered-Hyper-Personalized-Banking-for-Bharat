export type StressLevel = "GREEN" | "YELLOW" | "ORANGE" | "RED";
export type Segment = "seasonal_earners" | "prudent_savers" | "digital_natives" | "aspiring_spenders" | "stressed_accounts";
export type LanguageCode = "hi" | "en" | "ta" | "bn" | "te" | "mr" | "gu" | "kn" | "ml" | "pa" | "or" | "as";
export type DemoCustomer = { id:string; name:string; firstName:string; initials:string; segment:Segment; segmentLabel:string; language:LanguageCode; stress:number; stressLevel:StressLevel; balance:number; income:number; savingsRate:number; wellness:number; location:string; dob:string; aadhaar:string; insight:string; recommendations: Recommendation[] };
export type Recommendation = { id:string; name:string; category:string; reason:string; benefit:string; match:number; icon:string; factors:{label:string;value:number;positive:boolean}[] };
export type ChatMessage = { id:string; role:"user"|"assistant"; content:string; tool?:"balance"|"support"|"loan" };

import { CountryType } from 'src/shared/types/country.type'

export interface ReusableCountrySelectProps {
  
  name: string
  label: string 
  options: CountryType[]
  defaultValue?: CountryType | null 
  className?: string 
 
}

import { divisionKind, divisionKindDTO } from "@utils/enums"
import inverseEnum from "./inverseEnum"

export default function getNameDivision(division) {
    return divisionKind[inverseEnum(divisionKindDTO)[division.kind]] + " № " + division.number
}

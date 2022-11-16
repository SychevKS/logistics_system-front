export default function checkRoleUser(requiredRoles) {
    const userRoles = JSON.parse(sessionStorage.getItem("roles"))

    return requiredRoles.some(role => userRoles.includes(role))
}

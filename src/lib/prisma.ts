import { $Enums, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const hasPrivilege = async (userId: number, targetOwnerId: number) => {

    // if owns, true
    if (userId === targetOwnerId) {
        return true;
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const targetOwner = await prisma.user.findUnique({ where: { id: targetOwnerId } });
    
    // if admin, true, they can do anything
    if (user?.roles.includes($Enums.UserRole.ADMIN)) {
        return true;
    }
    // if the owner is a mod or admin, false (check)
    if (targetOwner?.roles.includes($Enums.UserRole.MODERATOR) || 
        targetOwner?.roles.includes($Enums.UserRole.ADMIN)) {
            return false;
    }
    else if (user?.roles.includes($Enums.UserRole.MODERATOR)) {
        return true;
    }
    return false;
    
}

export default prisma;
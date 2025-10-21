import { Injectable } from '@nestjs/common'
import { CreateBankAccountDto } from '../dto/create-bank-account.dto'
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto'
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories'
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service'
import { BankAccountType } from '../entities/BankAccount'


@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}
  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto

    return this.bankAccountsRepo.create({
      data: {
        color,
        initialBalance,
        name,
        type,
        userId,
      },
    })
  }

  async findAllByUserId(userId: string) {
    type Transaction = {
      type: 'INCOME' | 'EXPENSE';
      value: number;
    };

    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    }) as Array<{
      transactions: Transaction[];
      color: string;
      initialBalance: number;
      name: string;
      type: BankAccountType;
      id: string;
      userId: string;
    }>;

    return bankAccounts.map(({ 
      transactions,
      ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0,
      )

      const currentBalance = bankAccount.initialBalance + totalTransactions
      return {
        ...bankAccount,
        currentBalance,
      }
    })
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    )

    const { color, initialBalance, name, type } = updateBankAccountDto

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        color,
        initialBalance,
        name,
        type,
      },
    })
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    )

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId },
    })

    return null
  }
}

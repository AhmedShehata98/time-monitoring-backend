import { Injectable } from '@nestjs/common';
import { CreateCompanyPolicyDto } from './dto/create-company_policy.dto';
import { UpdateCompanyPolicyDto } from './dto/update-company_policy.dto';

@Injectable()
export class CompanyPoliciesService {
  create(createCompanyPolicyDto: CreateCompanyPolicyDto) {
    return 'This action adds a new companyPolicy';
  }

  findAll() {
    return `This action returns all companyPolicies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyPolicy`;
  }

  update(id: number, updateCompanyPolicyDto: UpdateCompanyPolicyDto) {
    return `This action updates a #${id} companyPolicy`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyPolicy`;
  }
}

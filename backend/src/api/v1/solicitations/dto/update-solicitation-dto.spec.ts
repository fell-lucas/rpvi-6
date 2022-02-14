import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateSolicitationDto } from './update-solicitation.dto';

describe('Update DTO', () => {
  it('should throw when the status is not one of the enum values.', async () => {
    const request = { status: 'INVALID_STATUS' };
    const requestDTO = plainToInstance(UpdateSolicitationDto, request);
    const errors = await validate(requestDTO);
    expect(errors.length).not.toBe(0);
    expect(errors[0]['constraints']['isEnum']).toEqual(
      'status must be a valid enum value',
    );
  });
});

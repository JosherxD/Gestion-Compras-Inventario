
import { ErrorModel } from '../../domain/models/error.model.spec';

describe('Constants module', () => {
  it('should expose the correct ERROR structure', () => {
    const errorSpy = jest.spyOn(constants, 'ERROR', 'get');

    const error = constants.ERROR;

    expect(errorSpy).toHaveBeenCalled();
    expect(error.ERROR_LIST_ORDER).toEqual<ErrorModel['ERROR_LIST_ORDER']>({
      level: 'ERROR',
      statusDetail: 'ERROR_LIST_ORDER',
      statusCode: 500,
      title: 'Error order list',
      detail: 'Error order list',
    });
  });

  it('should expose the correct HttpStatus values', () => {
    const httpStatusSpy = jest.spyOn(constants, 'HttpStatus', 'get');

    const status = constants.HttpStatus;

    expect(httpStatusSpy).toHaveBeenCalled();
    expect(status.OK).toBe(200);
    expect(status.CREATED).toBe(201);
    expect(status.BAD_REQUEST).toBe(400);
    expect(status.INTERNAL_SERVER_ERROR).toBe(500);
    expect(status.NOT_FOUND).toBe(404);
  });
});

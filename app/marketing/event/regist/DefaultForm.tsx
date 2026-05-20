import FileUpload from '@/components/ui/FileUpload';
import { SButton, SInput, SRadioGroup } from '@zzou/design-system';
import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';

type DefaultFormProps = {
  register: any;
  errors: any;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  setFileList: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function DefaultForm({ register, errors, watch, setValue, setFileList }: DefaultFormProps) {
  const eventType = [
    { label: '일반', value: 'general' },
    { label: '퀴즈', value: 'quiz' },
    { label: '룰렛', value: 'roulette' },
    { label: '출석', value: 'attendance' },
    { label: '설문', value: 'survey' },
  ];
  const eventTarget = [
    { label: '모든 회원', value: 'all' },
    { label: '뱅킹 회원', value: 'banking' },
    { label: '증권 회원', value: 'securities' },
  ];
  const eventStatus = [
    { label: '게시', value: 'published' },
    { label: '미게시', value: 'unpublished' },
  ];
  const benefitType = [
    { label: '즉시 지급', value: 'immediate' },
    { label: '당첨후 지급', value: 'after_win' },
    { label: '혜택 없음', value: 'no_benefit' },
  ];

  return (
    <table className="table reg mt-10">
      <colgroup>
        <col style={{ width: '160px' }} />
        <col style={{ width: 'auto' }} />
        <col style={{ width: '160px' }} />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">제목<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td colSpan={3}>
            <SInput type="text" size="small" placeholder="이벤트 제목을 입력해주세요." {...register('eventName')} />
            {errors.eventName && (
              <div className="input-guide error"><span className="error">{errors.eventName.message}</span></div>
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">이벤트 유형<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <SRadioGroup
              name="eventType"
              size="small"
              direction="horizontal"
              options={eventType}
              value={watch('eventType')}
              onChange={(value) => setValue('eventType', value, { shouldValidate: true })}
            />
            {errors.eventType && (
              <div className="input-guide error"><span className="error">{errors.eventType.message}</span></div>
            )}
          </td>
          <th scope="row">게시여부<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <SRadioGroup
              name="eventStatus"
              size="small"
              direction="horizontal"
              options={eventStatus}
              value={watch('eventStatus')}
              onChange={(value) => setValue('eventStatus', value, { shouldValidate: true })}
            />
            {errors.eventStatus && (
              <div className="input-guide error"><span className="error">{errors.eventStatus.message}</span></div>
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">이벤트 대상<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td colSpan={3}>
            <SRadioGroup
              name="eventTarget"
              size="small"
              direction="horizontal"
              options={eventTarget}
              value={watch('eventTarget')}
              onChange={(value) => setValue('eventTarget', value, { shouldValidate: true })}
            />
            {errors.eventTarget && (
              <div className="input-guide error"><span className="error">{errors.eventTarget.message}</span></div>
            )}

            <div className="mt-15">
              {/* <button type="button" className="btn btn-slm">회원그룹 선택</button> */}
              <SButton type="button" size="small" variant="outline">회원그룹 선택</SButton>
            </div>
            
            <div className="mt-15">
              <div className="ui-chips-item">
                <span>KB뱅킹</span>
              <button type="button" className="ui-chips-del"><span className="offscreen">삭제하기</span></button>
              </div>
            </div>
          
          </td>
        </tr>
        <tr>
          <th scope="row">이벤트 기간<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td></td>
          <th scope="row">당첨자 발표일<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">혜택 구분<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <div className="reg-group">
              <SRadioGroup
                name="benefitType"
                size="small"
                direction="horizontal"
                options={benefitType}
                value={watch('benefitType')}
                onChange={(value) => setValue('benefitType', value, { shouldValidate: true })}
              />
            </div>
            {errors.benefitType && (
              <div className="input-guide error"><span className="error">{errors.benefitType.message}</span></div>
            )}
          </td>
          <th scope="row">참여제한<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <div className="reg-group inline">
              <div className="reg-item">
                <select className="custom-select" {...register('useType')}>
                  <option value="1">1</option>
                </select>
              </div>
            </div>
            {errors.useType && (
              <div className="input-guide error"><span className="error">{errors.useType.message}</span></div>
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">마케팅 정보 PUSH<br />수신동의<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td colSpan={3}>
            <div className="reg-group">
              <div className="reg-item">
                <span className="checkbox">
                  <input type="checkbox" id="marketingPushAgreement" value={true} {...register('marketingPushAgreement')} />
                  <label htmlFor="marketingPushAgreement">마케팅 정보 PUSH 수신동의</label>
                </span>
              </div>
            </div>
            {errors.marketingPushAgreement ? (
              <div className="input-guide error"><span className="error">{errors.marketingPushAgreement.message}</span></div>
            ) : (
              <span className="input-guide">&apos;필수&apos; 선택 시 마케팅 정보(PUSH) 수신에 동의한 회원만 이벤트 참여가 가능합니다.</span>
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">이벤트 배너<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <FileUpload fileList={watch('eventBanner')} setFileList={setFileList} />
            {errors.eventBanner && (
              <div className="input-guide error"><span className="error">{errors.eventBanner.message}</span></div>
            )}
          </td>
          <th scope="row">이미지 설명<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <div className="reg-group">
              <div className="reg-item">
                <input type="text" className="form-control" />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

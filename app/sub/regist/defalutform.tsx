import FileUpload from '@/components/ui/FileUpload';
export default function DefaultForm({ register, errors, watch, setFileList }: { register: any, errors: any, watch: any, setFileList: React.Dispatch<React.SetStateAction<File[]>> }) {
    // Row Data: The data to be displayed.
    const eventType=[
        { label: '일반', value: '1' },
        { label: '퀴즈', value: '2' },
        { label: '룰렛', value: '3' },
        { label: '출석', value: '4' },
        { label: '설문', value: '5' },
    ]
    const eventTarget=[
        { label: '모든 회원', value: '1' },
        { label: '뱅킹 회원', value: '2' },
        { label: '증권 회원', value: '2' },
    ]
    const eventStatus=[
        { label: '게시', value: '1' },
        { label: '미게시', value: '2' },
    ]
    const benefitType=[
        { label: '즉시 지급', value: '1' },
        { label: '당첨후 지급', value: '2' },
        { label: '혜택 없음', value: '3' },
    ]
    

    return (
        <table className="table reg mt-10">
            <colgroup>
                <col style={{width: '160px'}} />
                <col style={{width: 'auto'}} />
                <col style={{width: '160px'}} />
            </colgroup>
            <tbody>
                <tr>
                    <th scope="row">제목<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td colSpan={3}>
                        <div className="reg-group wp-100">
                            <div className="reg-item" >
                                <input type="text" className={`form-control ${errors.eventName ? 'error' : ''}`} {...register('eventName')} />
                            </div>
                        </div>
                        {errors.eventName &&
                            <div className="input-guide error" > <span className="error">{errors.eventName.message}</span></div>
                        }
                    </td>
                </tr>
                <tr>
                    <th scope="row">이벤트 유형<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td>
                        <div className="reg-group wp-100">
                            <div className="reg-item">
                                {eventType.map((item, index) => (
                                    <span className="radio" key={index}>
                                        <input type="radio" name="eventType" id={`eventType${index}`} value={item.value} {...register('eventType')} />
                                        <label htmlFor={`eventType${index}`}>{item.label}</label>
                                    </span>
                                ))}
                                
                            </div>
                        </div>
                        {errors.eventType &&
                            <div className="input-guide error" > <span className="error">{errors.eventType.message}</span></div>
                        }
                    </td>
                    <th scope="row">게시여부<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td>
                        <div className="reg-group wp-100">
                            <div className="reg-item">
                                {eventStatus.map((item, index) => (
                                    <span className="radio" key={index}>
                                        <input type="radio" name="eventStatus" id={`eventStatus${index}`}value={item.value} {...register('eventStatus')}/>
                                        <label htmlFor={`eventStatus${index}`}>{item.label}</label>
                                    </span>
                                ))}
                            </div>
                        </div>
                        {errors.eventStatus &&
                            <div className="input-guide error" > <span className="error">{errors.eventStatus.message}</span></div>
                        }
                    </td>
                </tr>
                <tr>
                    <th scope="row">이벤트 대상<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td colSpan={3}>
                        <div className="reg-group">
                            <div className="reg-item">
                                {eventTarget.map((item, index) => (
                                    <span className="radio" key={index}>
                                        <input type="radio" name="eventTarget" id={`eventTarget${index}`} value={item.value} {...register('eventTarget')}/>
                                        <label htmlFor={`eventTarget${index}`}>{item.label}</label>
                                    </span>
                                ))}
                            </div>
                        </div>
                        {errors.eventTarget &&
                            <div className="input-guide error" > <span className="error">{errors.eventTarget.message}</span></div>
                        }
                        <div className="reg-group">
                            <div className="reg-item">
                            <button type="button" className="btn btn-slm">회원그룹 선택</button>
                            </div>
                        </div>
                        <div className="reg-group">
                            <div className="reg-item">
                            <div className="ui-chips">
                                <div className="ui-chips-item">
                                    <span>KB뱅킹</span>
                                    <button type="button" className="ui-chips-del"><span className="offscreen">삭제하기</span></button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">이벤트 기간<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td >
                        
                    </td>
                    <th scope="row">당첨자 발표일<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td >
                        
                    </td>
                </tr>
                <tr>
                    <th scope="row">혜택 구분<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td >
                        <div className="reg-group">
                            <div className="reg-item">
                                {benefitType.map((item, index) => (
                                    <span className="radio" key={index}>
                                        <input type="radio" name="benefitType" id={`benefitType${index}`} value={item.value} {...register('benefitType')}/>
                                        <label htmlFor={`benefitType${index}`}>{item.label}</label>
                                    </span>
                                ))}
                            </div>
                        </div>
                        {errors.benefitType &&
                            <div className="input-guide error" > <span className="error">{errors.benefitType.message}</span></div>
                        }
                    </td>
                    <th scope="row">참여제한<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td >
                        <div className="reg-group inline">
                            <div className="reg-item">
                                <select className="custom-select" {...register('useType')}>
                                    <option value="1">1</option>
                                </select>
                            </div>
                        </div>
                        {errors.useType &&
                            <div className="input-guide error" > <span className="error">{errors.useType.message}</span></div>
                        }
                    </td>
                </tr>
                <tr>
                    <th scope="row">마케팅 정보 PUSH<br/> 수신동의<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td colSpan={3}>
                        <div className="reg-group">
                            <div className="reg-item">
                                <span className="checkbox">
                                    <input type="checkbox" id="marketingPushAgreement" value={true} {...register('marketingPushAgreement')}/>
                                    <label htmlFor="marketingPushAgreement">마케팅 정보 PUSH 수신동의</label>
                                </span>
                                
                            </div>
                        </div>
                        {errors.marketingPushAgreement ? (
                            <div className="input-guide error" > <span className="error">{errors.marketingPushAgreement.message}</span></div>
                        ) : (
                            <span className="input-guide"> &apos;필수&apos; 선택 시 마케팅 정보(PUSH) 수신에 동의한 회원만 이벤트 참여가 가능합니다.</span>
                        )}
                    </td>
                </tr>
                <tr>
                    <th scope="row">약관<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td colSpan={3}>
                        <div className="table-util">
                            <div className="btn-set-m flex">
                            <button type="button" className="btn btn-ss">추가</button>
                            <button type="button" className="btn btn-ss">삭제</button>
                            </div>
                        </div>
                        <div className="reg-group">
                            <div className="reg-item">
                                {watch('agreementList').length > 0 ? (
                                    watch('agreementList')?.map((item: { label: string }, index: number) => (
                                        <div key={index}>
                                            {item.label}
                                        </div>
                                    ))
                                ) : (
                                    <div>약관이 없습니다.</div>
                                )}
                               
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">이벤트 배너<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td>
                        {console.log(watch('eventBanner'))}
                        <FileUpload fileList={watch('eventBanner')} setFileList={setFileList} />
                        {errors.eventBanner &&
                            <div className="input-guide error" > <span className="error">{errors.eventBanner.message}</span></div>
                        }
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
                <tr>
                    <th scope="row">메인 이미지<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td colSpan={3}>
                        <div className="reg-group">
                            <div className="reg-item">
                                <div className="btn-file">
                                    <input type="file" id="upload-file" hidden />
                                    <label className="btn-up" htmlFor="upload-file">파일첨부</label>
                                </div>
                            </div>
                        </div>
                        <div className="upload-file-box">
                            <div className="upload-file-head flex space-between">
                                <button type="button" className="btn del-all btn-secondary"><span className="offscreen">전체파일삭제</span></button>
                                <span className="name">파일명</span><span className="volume">용량</span>
                            </div>
                            <div className="upload-file-list">
                                <div className="upload-file-list-item flex space-between">
                                    <button type="button" className="btn del btn-secondary"><span className="offscreen">파일삭제</span></button>
                                    <span className="name">chrome.dll</span><span className="volume">214.52 MB</span>
                                </div>
                            </div>
                        </div>
                    </td>
                
                </tr>
            </tbody>
        </table>
    )
}
import './styles/reset.css';
import './styles/App.css';
import { Button, Card, Sheet, Stack, Typography, Box, Chip, RadioGroup, Radio, Select, Option, Input } from '@mui/joy';
import heroSectionImg from './assets/images/hero_section.png';
import detailSectionImg1 from './assets/images/detail_1.png';
import detailSectionImg2 from './assets/images/detail_2.png';
import guideSectionImg1 from './assets/images/mockup_1.png';
import guideSectionImg2 from './assets/images/mockup_2.png';
import guideSectionImg3 from './assets/images/mockup_3.png';
import guideSectionImg4 from './assets/images/mockup_4.png';
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

import { Modal } from './component/Modal'
import { useEffect, useState } from 'react';
function App() {

  const LOCAL_STORAGE_KEY = 'user_id';
  const AMPLITUDE_KEY = '064783e4cccb3d0b13c11e42bea626';
  // open modal
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenDownload, setIsOpenDownload] = useState(false);

  // gender and age
  const [gender, setGender] = useState<string>('female');
  const [age, setAge] = useState<number | null>(null);

  // phone number
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // session replay plugin
  const replayPlugin = sessionReplayPlugin({
    sampleRate: 0.1, // 10% 녹화 (운영에서는 보통 낮춤)
  });
  const userId = localStorage.getItem(LOCAL_STORAGE_KEY);

  useEffect(() => {
    amplitude.add(replayPlugin);

    const amplitudeId = userId || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(LOCAL_STORAGE_KEY, amplitudeId);

    amplitude.init(AMPLITUDE_KEY, amplitudeId, {
      defaultTracking: {
        pageViews: true,
        sessions: true,
        attribution: true
      }
    });
  }, []);

  const getInfo = () => {
    if (!gender || !age) return alert('성별과 연령대를 선택해주세요.');
    amplitude.track('성별연령_선택완료', {
      gender: gender,
      age: age
    });
    setIsOpen(false);
  }

  const clickDownloadButton = (buttonLocation: string) => {
    setIsOpenDownload(true);
    amplitude.track('앱다운로드_클릭', {
      button: buttonLocation
    });
  }

  const clickNotificationSignup = () => {
    if (!phoneNumber) return alert('휴대폰번호를 입력해주세요.');
    if (phoneNumber.length !== 11) return alert('휴대폰번호를 11자리로 입력해주세요.');
    amplitude.track('휴대폰번호_완료', {
      phone: phoneNumber
    });
    setIsOpenDownload(false);
    alert('신청이 완료되었습니다.');
  }

  const justTakeALook = () => {
    amplitude.track('휴대폰번호_둘러볼게요');
    setIsOpenDownload(false);
  }

  return (
    <Stack>
      {isOpen && !userId &&
        <Modal>
          <Stack gap={1.5}>
            <Stack>
              <Typography fontSize={'17px'} fontWeight={400} fontFamily={'Alice'} textAlign={'center'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                Book
                <span style={{fontFamily: 'Bodoni Moda', fontSize: '8px', fontWeight: '400', padding: '1.56px 4.68px', backgroundColor: '#171917', borderRadius: '119.23px', color: '#FDFDFD', boxSizing: 'border-box', marginLeft: '2px'}}>with us</span>
              </Typography>
            </Stack>
            <Stack alignItems={'center'}>
              <Typography fontWeight={500} fontSize={'18px'} sx={{color: '#746265'}}>당신의 책장과 어울리는 사람을 위해</Typography>
              <Typography fontWeight={600} fontSize={'24px'} fontStyle={'semi-bold'}>성별과 연령대를 선택해주세요</Typography>
            </Stack>
            <Stack gap={2}>
              <Stack gap={1}>
                <Typography fontWeight={600} fontSize={'18px'}>성별</Typography>
                <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)} orientation="horizontal" sx={{display: 'flex'}}>
                  <Radio value="female" label="여자" sx={{flex: 1}}/>
                  <Radio value="male" label="남자" sx={{flex: 1}}/>
                </RadioGroup>
              </Stack>
              <Stack gap={1}>
                <Typography fontWeight={600} fontSize={'18px'}>태어난 해</Typography>
                <Select placeholder="태어난 해를 선택해주세요" value={age} onChange={(_, newValue) => setAge(newValue)}>
                  {
                    Array.from({length: 38}, (_, index) => (
                      <Option value={2007 - index}>{2007 - index}</Option>
                    ))
                  }
                </Select>
              </Stack>
              <Button sx={{backgroundColor: '#746265', color: '#fff', height: '50px', fontWeight: '500', fontSize: '18px'}} onClick={getInfo}>선택완료</Button>
            </Stack>
          </Stack>
        </Modal>
      }

      {isOpenDownload && 
        <Modal>
          <Stack gap={1}>
            <Stack alignItems={'center'}>
              <Chip size='sm' sx={{backgroundColor: '#746265', color: '#fff'}}>BETA</Chip>
              <Typography fontSize={'17px'} fontWeight={400} fontFamily={'Alice'} textAlign={'center'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                Book
                <span style={{fontFamily: 'Bodoni Moda', fontSize: '8px', fontWeight: '400', padding: '1.56px 4.68px', backgroundColor: '#171917', borderRadius: '119.23px', color: '#FDFDFD', boxSizing: 'border-box', marginLeft: '2px'}}>with us</span>
              </Typography>
            </Stack>
            <Stack alignItems={'center'}>
              <Typography fontWeight={600} fontSize={'24px'}>현재 소수 인원으로</Typography>
              <Typography fontWeight={600} fontSize={'24px'} sx={{position: 'relative', top: '-5px'}}>
                <span style={{color: '#746265'}}>베타</span> 운영 중이예요
              </Typography>
            </Stack>
            <Stack alignItems={'center'}>
              <Typography fontWeight={400} fontSize={'17px'}>더 진지한 만남을 위한 경험을 만들기 위해</Typography>
              <Typography fontWeight={400} fontSize={'17px'}>현재는 <span style={{fontWeight: 700}}>제한된 인원</span>만 참여하고 있어요.</Typography>
            </Stack>
            <Stack alignItems={'center'}>
              <Typography fontWeight={400} fontSize={'17px'}>지금은 바로 참여가 어렵지만,</Typography>
              <Typography fontWeight={400} fontSize={'17px'}>연락처를 남겨주시면 <span style={{fontWeight: 700}}>정식 오픈 소식</span>을</Typography>
              <Typography fontWeight={400} fontSize={'17px'}>가장 먼저 알려드릴게요.</Typography>
            </Stack>
            <Stack gap={1} sx={{marginTop: '1rem'}}>
              <Typography fontWeight={600} fontSize={'17px'}>전화번호 <span style={{color: '#A6A6A6', fontWeight: 400}}>(문자발송)</span></Typography>
              <Input placeholder='`-`없이 숫자만 입력해주세요.' sx={{height: '50px'}} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              <Typography fontWeight={400} fontSize={'14px'}>💡 알림은 편하게 받아보실 수 있게 보내드릴게요.<br />‘소개팅’ 같은 부담스러운 표현은 사용하지 않아요.</Typography>
            </Stack>
          </Stack>
          <Stack gap={1} sx={{marginTop: '1rem'}}>
            <Button sx={{backgroundColor: '#746265', color: '#fff', height: '50px', fontWeight: '500', fontSize: '18px'}} onClick={clickNotificationSignup}>오픈 알림 받기</Button>
            <Button sx={{backgroundColor: '#fff', color: '#746265', height: '50px', fontWeight: '500', fontSize: '18px', border: '1px solid #746265'}} onClick={justTakeALook}>그냥 둘러볼게요</Button>
          </Stack>
        </Modal>
      }

      

      {/* hero section */}
      <Sheet className='section' sx={{backgroundColor: '#746265', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {/* header */}
        <Sheet className='section' sx={{color: '#fff', position: 'absolute', top: 0, zIndex: 100, width: '100%', backgroundColor: 'transparent'}}>
          <Stack padding={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{boxSizing: 'border-box'}}>
            <Typography fontSize={'26px'} fontWeight={400} fontFamily={'Alice'} sx={{color: '#fff', display: 'flex', alignItems: 'center'}}>
              Book
              <span style={{fontFamily: 'Bodoni Moda', fontSize: '12px', fontWeight: '400', padding: '2.38px 7.15px', backgroundColor: '#FDFDFD', borderRadius: '119.23px', color: '#171917', boxSizing: 'border-box', marginLeft: '2px'}}>with us</span>
            </Typography>
            <Button sx={{borderRadius: '100px', background: '#FDFDFD', fontWeight: '600', fontSize: '14px', color: '#533424'}} onClick={() => clickDownloadButton('up')}>앱 다운로드</Button>
          </Stack>
        </Sheet>
        
        <Stack sx={{position: 'absolute', top: '18%'}} gap={1.5}>
          <Typography fontSize={'33px'} fontWeight={700} lineHeight={'42px'} textAlign={'center'} fontFamily={'Bookk Myungjo'} sx={{color: '#fff'}}>
            책장으로 먼저 만나는<br />지적인 소개팅
          </Typography>
          <Typography fontSize={'18px'} fontWeight={300} textAlign={'center'} sx={{color: '#FFFFFF'}} fontFamily={'Pretendard'}>
            책장이 당신을 대신 소개합니다
          </Typography>
        </Stack>
        <img src={heroSectionImg} style={{width: '100%', display: 'block'}}/>
      </Sheet>

      {/* detail section */}
      <Sheet className='section' sx={{backgroundColor: '#F5F1ED', padding: '5rem 1rem'}}>
        <Stack justifyContent={'center'} alignItems={'center'}>
          <Typography fontWeight={700} fontSize={'28px'} fontFamily={'Bookk Myungjo'} sx={{color: '#171917'}}>책으로 만나는 소개팅</Typography>
          <Typography fontWeight={400} fontSize={'18px'} fontFamily={'Pretendard'} sx={{color: '#3B3D3B'}}>가벼움도 스펙도 아닌 생각의 결로 시작해요</Typography>
        </Stack>
        <Stack gap={2} sx={{marginTop: '2rem', maxWidth: '320px'}}>
          <Card className="detail-section-card">
            <img src={detailSectionImg1} />
            <Stack gap={1.5}>
              <Typography fontWeight={700} fontSize={'24px'} fontFamily={'Bookk Myungjo'} textAlign={'center'} sx={{color: '#171917'}}>가볍지 않은 진지한 만남</Typography>
              <Typography fontWeight={400} fontSize={'16px'} fontFamily={'Pretendard'} textAlign={'center'} sx={{color: '#3B3D3B', lineHeight: '1.3'}}>가벼운 만남보다, 책 한 권을<br/> 함께 이야기할 수 있는 인연</Typography>
            </Stack>
          </Card>
          <Card className="detail-section-card">
            <img src={detailSectionImg2} />
            <Stack gap={1.5}>
              <Typography fontWeight={700} fontSize={'24px'} fontFamily={'Bookk Myungjo'} textAlign={'center'} sx={{color: '#171917'}}>스펙 말고 생각부터</Typography>
              <Typography fontWeight={400} fontSize={'16px'} fontFamily={'Pretendard'} textAlign={'center'} sx={{color: '#3B3D3B', lineHeight: '1.3'}}>연봉, 직업같은 스펙 매칭보다는<br/>취향과 가치관 먼저 자연스럽게 알아가요.</Typography>
            </Stack>
          </Card>
        </Stack>
      </Sheet>

      {/* guide section */}
      <Sheet className='section' sx={{backgroundColor: '#FFF'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem 0', gap: '16px'}}>
          <Chip size='lg' sx={{backgroundColor: '#746265', color: '#fff', fontWeight: '600', fontSize: '16px', padding: '8px 14px'}}>STEP 01</Chip>
          <Stack alignItems={'center'}>
            <Typography fontWeight={700} fontSize={'24px'} fontFamily={'Bookk Myungjo'} sx={{color: '#171917'}}>매일 인생책 카드 2장 받기</Typography>
            <Typography fontWeight={400} fontSize={'18px'} fontFamily={'Pretendard'}>책이 더 궁금한 사람을 골라보세요.</Typography>
          </Stack>
          <img src={guideSectionImg1} style={{marginTop: '1rem'}}/>
        </Box>
      </Sheet>

      <Sheet className='section' sx={{backgroundColor: '#F5F1ED'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem 0', gap: '16px'}}>
          <Chip size='lg' sx={{backgroundColor: '#746265', color: '#fff', fontWeight: '600', fontSize: '16px', padding: '8px 14px'}}>STEP 02</Chip>
          <Stack alignItems={'center'}>
            <Typography fontWeight={700} fontSize={'24px'} fontFamily={'Bookk Myungjo'} sx={{color: '#171917'}}>책장으로 먼저 알아보기</Typography>
            <Typography fontWeight={400} fontSize={'18px'} fontFamily={'Pretendard'}>문장과 취향부터 살펴보세요.</Typography>
          </Stack>
          <img src={guideSectionImg2} style={{marginTop: '1rem'}}/>
        </Box>
      </Sheet>

      <Sheet className='section' sx={{backgroundColor: '#FFF'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem 0', gap: '16px'}}>
          <Chip size='lg' sx={{backgroundColor: '#746265', color: '#fff', fontWeight: '600', fontSize: '16px', padding: '8px 14px'}}>STEP 03</Chip>
          <Stack alignItems={'center'}>
            <Typography fontWeight={700} fontSize={'24px'} fontFamily={'Bookk Myungjo'} sx={{color: '#171917'}}>프로필 상세정보 확인</Typography>
            <Typography fontWeight={400} fontSize={'18px'} fontFamily={'Pretendard'}>공감됐다면, 프로필로 더 깊이 알아보세요.</Typography>
          </Stack>
          <img src={guideSectionImg3} style={{marginTop: '1rem'}}/>
        </Box>
      </Sheet>

      <Sheet className='section' sx={{backgroundColor: '#F5F1ED'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem 0', gap: '16px'}}>
          <Chip size='lg' sx={{backgroundColor: '#746265', color: '#fff', fontWeight: '600', fontSize: '16px', padding: '8px 14px'}}>STEP 04</Chip>
          <Stack alignItems={'center'}>
            <Typography fontWeight={700} fontSize={'24px'} fontFamily={'Bookk Myungjo'} sx={{color: '#171917'}}>대화로 이어가기</Typography>
            <Typography fontWeight={400} fontSize={'18px'} fontFamily={'Pretendard'}>끌린 사람과 편하게 이야기해요.</Typography>
          </Stack>
          <img src={guideSectionImg4} style={{marginTop: '1rem'}}/>
        </Box>
      </Sheet>

      {/* download section  */}
      <Sheet className='section' sx={{backgroundColor: '#746265', padding: '4rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
        <Typography fontWeight={700} fontSize={'28px'} fontFamily={'Bookk Myungjo'} textAlign={'center'} sx={{color: '#FFFFFF'}}>
          오늘, 책으로 만나는 사람
        </Typography>
        <Stack>
          <Typography fontWeight={200} fontSize={'18px'} fontFamily={'Pretendard'} textAlign={'center'} sx={{color: '#FFFFFF'}}>
            매일 두 권의 인색책으로 생각의 결이
          </Typography>
          <Typography fontWeight={200} fontSize={'18px'} fontFamily={'Pretendard'} textAlign={'center'} sx={{color: '#FFFFFF', position: 'relative', top: '-5px'}}>
            맞는 사람을 만나고 대화를 이어가세요.
          </Typography>
        </Stack>
        <Button onClick={() => clickDownloadButton('down')} sx={{backgroundColor: '#000', color: '#fff', height: '58px', width: '260px', borderRadius: '100px', fontWeight: '500', fontSize: '20px', fontFamily: 'Pretendard'}}>
          앱 다운로드
        </Button>
      </Sheet>

      {/* footer */}
      {/* <Sheet className='section' sx={{backgroundColor: '#333', padding: '2rem 1rem 3rem'}}>
        <Typography fontSize={'22px'} fontWeight={400} fontFamily={'Fredoka One'} sx={{color: '#fff'}}>dogwithus</Typography>
      </Sheet> */}

    </Stack>
  )
}

export default App

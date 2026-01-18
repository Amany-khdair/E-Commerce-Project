import { useTranslation } from 'react-i18next';
import FaqsComponent from '../../components/faqsComponent/FaqsComponent';
import GradientText from '../../functions/GradientText';
import Snowfall from 'react-snowfall';

export default function Faqs() {
    const { t } = useTranslation();
  return (
    <>

        <Snowfall color='#82C3D9' style={{position: 'fixed', zIndex: 10, pointerEvents: 'none'}}/>
        <GradientText sx={{ mt: 6, mb: 4}}>
            {t("FAQs")}
        </GradientText>
        <FaqsComponent/>
    </>
  )
}

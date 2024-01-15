import type { ProjectInterface } from '@app/types-interfaces'
import { useTranslation } from 'react-i18next'
import { isEnglish } from '@app/functions'
import Project from './Project'
import dracula_junior from '/img/projects/dracula_junior.png'
import rozen_maiden from '/img/projects/rozen_maiden.jpg'
import ib from '/img/projects/itch_binario.png'
import ib_1 from '/img/projects/itch_binario_1.png'
import ib_2 from '/img/projects/itch_binario_2.png'
import ib_3 from '/img/projects/itch_binario_3.png'
import ib_4 from '/img/projects/itch_binario_4.png'
import ib_5 from '/img/projects/itch_binario_5.png'
import ib_6 from '/img/projects/itch_binario_6.png'
import ib_7 from '/img/projects/itch_binario_7.png'
import amaliche from '/img/projects/amaliche.png'
import amaliche_1 from '/img/projects/amaliche_1.png'
import amaliche_2 from '/img/projects/amaliche_2.png'
import scenes_getter from '/img/projects/scenes_getter.png'
import ahklicker_en from '/img/projects/ahklicker_en.png'
import ahklicker_es from '/img/projects/ahklicker_es.png'

export default function ProjectsContainer() {
  const { t, i18n } = useTranslation()

  const ahklickerImage = isEnglish(i18n.language) ? ahklicker_en : ahklicker_es

  const projects: ProjectInterface[] = [
    {
      title: 'Dracula Junior',
      link: 'https://marketplace.visualstudio.com/items?itemName=FyeCobain.dracula-junior',
      description: t('projects.vscTheme'),
      image: dracula_junior,
      slider_images: [ dracula_junior ],
      maxHeight: true,
      languages: [],
    },
    {
      title: 'Rozen Maiden',
      link: null,
      description: 'Fansite',
      image: rozen_maiden,
      slider_images: [ rozen_maiden ],
      maxHeight: false,
      languages: [
        'Angular',
        'Laravel',
      ],
    },
    {
      title: 'ITCH Binario',
      link: `${ location.pathname }files/ITCH Binario_v2.0.0.apk`,
      description: t('projects.game'),
      image: ib,
      slider_images: [
        ib_1,
        ib_2,
        ib_3,
        ib_4,
        ib_5,
        ib_6,
        ib_7,
      ],
      maxHeight: true,
      languages: [ 'Android' ],
    },
    {
      title: 'Amaliche Club',
      link: 'https://play.google.com/store/apps/details?id=club.amaliche&hl=en',
      description: t('projects.chatApp'),
      image: amaliche,
      slider_images: [
        amaliche_1,
        amaliche_2,
      ],
      maxHeight: true,
      languages: [
        'Android',
        'Java',
      ],
    },
    {
      title: 'Scenes Getter',
      link: null,
      description: t('projects.scenesGetter'),
      image: scenes_getter,
      slider_images: [ scenes_getter ],
      maxHeight: true,
      languages: [ 'Phyton' ],
    },
    {
      title: 'AHKlicker',
      link: 'https://github.com/FyeCobain/AHKlicker',
      description: 'Auto clicker',
      image: ahklickerImage,
      slider_images: [ ahklickerImage ],
      maxHeight: true,
      languages: [ 'AutoHotkey' ],
    },
  ]

  return (
    <div className="projects-container">
    {
      projects.map((project: ProjectInterface, index: number) =>
        <Project key={ index } project={ project } />)
    }
    </div>
  )
}

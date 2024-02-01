import type { ProjectInterface } from '@app/types-interfaces'
import { useTranslation } from 'react-i18next'
import { getQueryParam, isEnglish } from '@app/functions'
import { PATH_NAME } from '@app/consts'
import ContentSlider from '@components/ContentSlider'
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
import scenes_getter_1 from '/img/projects/scenes_getter_1.png'
import scenes_getter_2 from '/img/projects/scenes_getter_2.png'
import ahklicker_1_en from '/img/projects/ahklicker_1_en.png'
import ahklicker_2_en from '/img/projects/ahklicker_2_en.png'
import ahklicker_1_es from '/img/projects/ahklicker_1_es.png'
import ahklicker_2_es from '/img/projects/ahklicker_2_es.png'

export default function ProjectsContainer() {
  const { t, i18n } = useTranslation()

  const ahklickerImages: string[] = isEnglish(i18n.language)
    ? [
        ahklicker_1_en,
        ahklicker_2_en,
      ]
    : [
        ahklicker_1_es,
        ahklicker_2_es,
      ]

  const projects: ProjectInterface[] = [
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
      link: `${ PATH_NAME }/files/ITCH Binario_v2.0.0.apk`,
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
      title: 'Dracula Junior',
      link: 'https://marketplace.visualstudio.com/items?itemName=FyeCobain.dracula-junior',
      description: t('projects.vscTheme'),
      image: dracula_junior,
      slider_images: [ dracula_junior ],
      maxHeight: false,
      languages: [],
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
      slider_images: [
        scenes_getter_1,
        scenes_getter_2,
      ],
      maxHeight: true,
      languages: [ 'Phyton' ],
    },
    {
      title: 'AHKlicker',
      link: 'https://github.com/FyeCobain/AHKlicker',
      description: 'Auto clicker',
      image: ahklickerImages[0],
      slider_images: ahklickerImages,
      maxHeight: true,
      languages: [ 'AutoHotkey' ],
    },
  ]

  // Selecting the first project
  let projectId: number | null = Number(getQueryParam('project'))
  if (projectId !== null && !isNaN(projectId)) {
    projectId = Math.floor(projectId)
    if (projectId > 1 && projectId <= projects.length) {
      const firstProject: ProjectInterface = projects[0]
      projects[0] = projects[projectId - 1]
      projects[projectId - 1] = firstProject
    }
  }

  return (
    <ContentSlider className="projects-container" phoneCols={ 0 } tabletCols={ 2 } laptopCols={ 3 }>
    {
      projects.map((project: ProjectInterface, index: number) =>
      <Project key={ index } index={ index } project={ project } />)
    }
    </ContentSlider>
  )
}

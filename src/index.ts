import check from './check'
import compareVersions from './changelog'
import versionCheck from './versionCheck'
import prettierCheck from './prettier'

compareVersions()
versionCheck()
prettierCheck()
check()

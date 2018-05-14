from pythonforandroid.toolchain import PythonRecipe, shprint, shutil, current_directory
from os.path import join, exists
import sh

class PsutilRecipe(PythonRecipe):
    version = '5.4.5'
    url = 'https://github.com/giampaolo/psutil/archive/release-{version}.tar.gz'
    depends = ['sh', 'resource']
    call_hostpython_via_targetpython = False
    site_packages_name = 'psutil'

    def build_arch(self, arch):
        env = self.get_recipe_env(arch)
        with current_directory(self.get_build_dir(arch.arch)):
            # Find pyconfig.h
            hostpython = sh.Command(self.hostpython_location)
            # Build python bindings
            shprint(hostpython,
                    'setup.py',
                    'build_ext'
            , _env=env)
        # Install python bindings
        super(PsutilRecipe, self).build_arch(arch)

    def get_recipe_env(self, arch):
        env = super(PsutilRecipe, self).get_recipe_env(arch)
        env['PYTHON_ROOT'] = self.ctx.get_python_install_dir()
        env['CFLAGS'] += ' -I' + env['PYTHON_ROOT'] + '/include/python3.5m'
        # Set linker to use the correct gcc
        env['LDSHARED'] = env['CC'] + ' -pthread -shared -Wl,-O1 -Wl,-Bsymbolic-functions'
        env['LDFLAGS'] += ' -L' + env['PYTHON_ROOT'] + '/lib' + \
                          ' -lpython3.5m'
        return env

recipe = PsutilRecipe()

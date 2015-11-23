"""Setup configuration file for the Leave application Python egg.
"""

from setuptools import setup, find_packages

setup(name="leave.app",
      version="1.0.0",
      description="",
      packages=find_packages(exclude=["tests"]),
      include_package_data=True,
      zip_safe=False,
      author='Vidhya',
      namespace_packages=['Products','base'],
      install_requires=['setuptools',
                        ],
      )

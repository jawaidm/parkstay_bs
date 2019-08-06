from setuptools import setup

setup(name='ledger',
      version='1.3',
      description='Ledger Payments App',
      url='https://github.com/dbca-wa/ledger',
      author='Department of Parks and Wildlife',
      author_email='asi@dbca.wa.gov.au',
      license='BSD',
      packages=['ledger','ledger.accounts','ledger.accounts.management','ledger.accounts.management.commands','ledger.accounts.migrations','ledger.accounts.templates',
                'ledger.address','ledger.address.fixtures','ledger.address.migrations',
                'ledger.basket','ledger.basket.migrations',
                'ledger.catalogue','ledger.catalogue.migrations',
                'ledger.checkout',,
                'ledger.dashboard','ledger.dashboard.catalogue',
                'ledger.emails',
                'ledger.licence','ledger.licence.migrations',
                'ledger.order','ledger.order.migrations',
                'ledger.partner','',
                'ledger.payments','ledger.payments.migrations',
                'ledger.static.ledger','ledger.static.ledger.css','ledger.static.ledger.fonts','ledger.static.ledger.images',
                'ledger.taxonomy',
                'ledger.templates','ledger.templates.basket.partials','ledger.templates.checkout','ledger.templates.email','ledger.templates.partials',
                ],
      install_requires=[],
      zip_safe=False)
